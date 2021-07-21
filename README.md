# token-supply-function

Deploying to AWS:
```
npm i
zip -r function.zip NODE.json index.js node_modules
aws lambda create-function --function-name token-supply --zip-file fileb://function.zip
```

After that, API Gateway needs to be set up manually.
