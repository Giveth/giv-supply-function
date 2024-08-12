# GIV Circulating Supply Endpoint

A nodejs endpoint that returns the current GIV token circulating and total supply. The lambda function has two variations to meet the [CoinGecko](https://www.coingecko.com/en/coins/giveth) and [CoinMarketCap](https://coinmarketcap.com/currencies/giveth/) circulating supply criteria.

## Build the image
```
docker compose build --no-cache
```
## Running the image locally
```
docker compose up -d --build
```
## Check endpoints
This will create the below endpoints as per the provider criteria

### Coingecko
[CoinGecko's GIV supply API.](http://localhost:3000/giv-supply-cg)
```
curl "http://localhost:3000/giv-supply-cg"
```
### Coinmarketcap
[CoinMarketCap's GIV supply API.](http://localhost:3000/giv-supply-cmc?q=circulating_supply)
Circulating:
```
curl "http://localhost:3000/giv-supply-cmc?q=circulating_supply"
```
Total:
```
curl http://localhost:3000/giv-supply-cmc?q=total_supply
```