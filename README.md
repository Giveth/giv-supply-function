# GIV Circulating Supply Endpoint
A nodejs endpoint that returns the current GIV token circulating and total supply. The lambda function has two variations to meet the [CoinGecko](https://www.coingecko.com/en/coins/giveth) and [CoinMarketCap](https://coinmarketcap.com/currencies/giveth/) circulating supply criteria.

## Current Hosted Endpoints
- [CoinGecko's GIV supply API.](https://circulating.giveth.io/token-supply)
- [CoinMarketCap's GIV Circulating supply API.](https://supply.giveth.io/giv-supply-cmc?q=circulating)
- [CoinMarketCap's GIV Total supply API.](https://supply.giveth.io/giv-supply-cmc?q=totalcoins)
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
```
curl "http://localhost:3000/token-supply"
```
### Coinmarketcap
Circulating:
```
curl "http://localhost:3000/giv-supply-cmc?q=circulating"
```
Total:
```
curl http://localhost:3000/giv-supply-cmc?q=totalcoins
```