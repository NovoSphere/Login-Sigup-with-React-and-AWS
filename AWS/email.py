import json
import boto3

import json
import boto3
import random
import string
import datetime
from custom_encoder import CustomEncoder, error_response

email_client = boto3.client("ses")
dynamo_client = boto3.resource(service_name='dynamodb', region_name='us-east-1')
product_table_email = dynamo_client.Table('email_otp')


def lambda_handler(event, context):
    try:
        print("requestBody-", event)
        otp_state = event.get('otpstate')
        emailid = event.get('emailid')

        if (otp_state == 'SENDOTP' or otp_state == 'RESEND'):
            randnum = random.randint(100000, 999999)
            subject = "OTP VERIFICATION"

            message = "Your otp is "

            if emailid:
                body = """<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                      <div style="margin:50px auto;width:70%;padding:20px 0">
                        <div style="border-bottom:1px solid #eee">
                          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">INTELLILANG</a>
                        </div>
                        <p style="font-size:1.1em">Hi,</p>
                        <p>Thank you for choosing INTELLILANG. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
                        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">{0}</h2>
                        <p style="font-size:0.9em;">Regards,<br />INTELLILANG</p>
                        <hr style="border:none;border-top:1px solid #eee" />
                        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                          <p>INTELLILANG</p>
                        </div>
                      </div>
                    </div>
                    """.format(randnum)
                product_table_email.put_item(Item={'email_id': emailid, 'otp': randnum})
                message_email = {"Subject": {"Data": subject}, "Body": {"Html": {"Data": body}}}
                email_client.send_email(Source="saisurajch123@gmail.com", Destination={"ToAddresses": [emailid]},
                                        Message=message_email)

            print(randnum)
            response = "OTP SENT SUCCESSFULLY"

        elif (otp_state == 'VERIFY'):
            otp_verify = event['otp']
            dbresponce = product_table_email.get_item(Key={'email_id': emailid})

            print("dbresponce", dbresponce)

            if "Item" in dbresponce:
                otp = dbresponce["Item"]["otp"]
                print(otp)
                if (str(otp) == str(otp_verify)):
                    response = "verified succesfully"
                else:
                    response = "OTP invalid"

        return {
            'statusCode': 200,
            'body': {"message": response},
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }

    except Exception as e:
        print(e)
        return error_response(e)
