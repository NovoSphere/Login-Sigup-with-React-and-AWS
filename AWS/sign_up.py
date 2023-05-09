import json
import boto3

dynamo_client = boto3.resource(service_name='dynamodb', region_name='us-east-1')
product_table = dynamo_client.Table('user')


def lambda_handler(event, context):
    email = event.get("email")
    name = event.get("name")
    password = event.get("password")
    product_table.put_item(Item={'email': email, 'name': name, "password": password})

    return {
        'statusCode': 200,
        'body': "user updated"
    }
