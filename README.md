# GIV Circulating Supply Lambda Function

This lambda function returns the current GIV token circulating and total supply. The lambda function has two variations to meet the [CoinGecko](https://www.coingecko.com/en/coins/giveth) and [CoinMarketCap](https://coinmarketcap.com/currencies/giveth/) circulating supply criteria.

- [CoinGecko's GIV supply API.](https://circulating.giveth.io/token-supply)
- [CoinMarketCap's GIV supply API.](https://supply.giveth.io/giv-supply-cmc?q=circulating)


## Installing the dependencies
```
npm install
```

## Running the Lambda function locally
To select the CoinGecko function:

```
cd coingecko
```
Or to select the CoinMarketCap function:
```
cd coinmarketcap
```
Then running the lambda function locally:
```
node-lambda run
```

## Deploying to AWS
Create `token-supply` AWS Lambda function, then:
```
npm i
npm run zip
aws lambda update-function-code --function-name token-supply --zip-file fileb://function.zip
```

After that, API Gateway needs to be set up manually.
