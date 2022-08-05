# token-supply-function

## Running the Lambda function locally
```
node-lambda run
```

## Deploying to AWS
Create `token-supply` AWS Lambda function, then:
```
npm i
zip -r function.zip NODE.json index.js node_modules
aws lambda update-function-code --function-name token-supply --zip-file fileb://function.zip
```

After that, API Gateway needs to be set up manually.
