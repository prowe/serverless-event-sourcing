#!/bin/bash

# aws cloudformation deploy \
#     --stack-name=prowe-serverless-event-source-bucket \
#     --template-file bucket.template.yaml

bucket_name=$(aws cloudformation describe-stack-resource \
    --stack-name=prowe-serverless-event-source-bucket \
    --logical-resource-id=DeployBucket \
    --query 'StackResourceDetail.PhysicalResourceId' \
    --output text)

echo "Using bucket $bucket_name"

aws cloudformation package \
    --template-file cloudformation.template.yaml \
    --s3-bucket $bucket_name \
    --output-template-file cloudformation.transformed.yaml