import json
import boto3
dynamo_client  =  boto3.resource(service_name = 'dynamodb',region_name = 'us-east-1')
product_table=dynamo_client.Table('user')

def lambda_handler(event, context):
    dbresponce=product_table.get_item(Key = {'email':event["email"]})
    if "Item" in dbresponce:
                password=dbresponce["Item"]["password"]
                print(password)
                if (str(password)==event["password"]):
                    response="verified"
                else:
                    response="password_incorrect"
    return {
            'statusCode': 200,
            'body': {"message":response},
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }