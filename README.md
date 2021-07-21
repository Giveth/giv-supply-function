# token-supply-function

Deploying to AWS:
```
npm i
zip -r function.zip NODE.json index.js node_modules
aws lambda update-function-code --function-name dappnode-circulation --zip-file fileb://function.zip
```

After that, API Gateway needs to be set up manually.
