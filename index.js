var ethers = require("ethers");
var urlxDAIProvider = "https://rpc.gnosischain.com";
var urlMainetProvider = "https://web3.dappnode.net";
var TokenArtifact = require("./NODE.json");
var Token = "0x900db999074d9277c5da2a43f252d74366230da0";
var Token_xDAI = "0x4f4F9b8D5B4d0Dc10506e5551B0513B61fD59e75";

var mainnet_sc = [
  "0x87dE995F6744B75bBe0255A973081142aDb61f4d", // Token Distro
  "0xf924fF0f192f0c7c073161e0d62CE7635114e74f", // Liquidity Safe
  "0x2B0ee142dCFE7C2dD150cDbd7B6832F6e9977f51", // OneGIV Liquidity Multisig
];

var xdai_sc = [
  "0xc0dbDcA66a0636236fAbe1B3C16B1bD4C84bB1E1", // Token Distro
  "0xe70494225312c6b1167c15134dab66730f36708d", // Giveth Treasury
  "0xf4ef9a155dd268e321afa7b9391e0602a7b09588", // GIVgarden Common Pool
  "0xf924fF0f192f0c7c073161e0d62CE7635114e74f", // Liquidity Safe
];

exports.handler = async () => {
  const mainnetProvider = new ethers.providers.JsonRpcProvider(
    urlMainetProvider
  );
  const xDAIProvider = new ethers.providers.JsonRpcProvider(urlxDAIProvider);

  const token = new ethers.Contract(Token, TokenArtifact.abi, mainnetProvider);
  const token_xdai = new ethers.Contract(
    Token_xDAI,
    TokenArtifact.abi,
    xDAIProvider
  );

  const totalSupply = await token.totalSupply();
  var circulating = totalSupply;

  const mainnet_sc_promises = mainnet_sc.map((item) => {
    return token.balanceOf(item);
  });

  const xdai_sc_promises = xdai_sc.map((item) => {
    return token_xdai.balanceOf(item);
  });

  const mainnet_values = await Promise.all(mainnet_sc_promises);

  for (var i = 0; i < mainnet_values.length; i++) {
    circulating = circulating.sub(mainnet_values[i]);
  }

  const xdai_values = await Promise.all(xdai_sc_promises);

  for (var i = 0; i < xdai_values.length; i++) {
    circulating = circulating.sub(xdai_values[i]);
  }

  const result = {
    totalSupply: totalSupply.toString(),
    circulating: circulating.toString(),
  };

  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
