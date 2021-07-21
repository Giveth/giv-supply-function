var ethers = require('ethers');
var urlxDAIProvider = "https://dai.poa.network"
var urlMainetProvider = "https://web3.dappnode.net"
var TokenArtifact = require('NODE.json');
var Token = "0xDa007777D86AC6d989cC9f79A73261b3fC5e0DA0";
var Token_xDAI = "0xc60e38C6352875c051B481Cbe79Dd0383AdB7817";


var mainnet_sc = [
    "0x87d6180b65Ad76A9443064DCD1596388Fcc3ee2a", // MerkleDistributor
    "0xCfA5B526105Ec86d893F24bC173b1d4166979f54", // TokenDistro,
    "0x59a7b5fac7C3Ec3a54EEAA98d40cc9bA8e2814F8", // ETH2Pool
    "0x5fE84e83D7346ebEE9685be4DadF9223d22A1E6F", // NewMerkleDrop
]

var xdai_sc = [
    "0x70B2219F8099f63e4259D9ec331B8EfB433cf3D2", // TokenDistro
    "0x7dD9CaBe4E0c3674ed3942d7c551532bbA76BDb1", // TokenDistro CORE,
    "0x8B4a98d2B74E7DEAf5B39BdE5f863E25C65f5e43", // FUTURE
    "0x8B45C9dAc86efD337e5fDF6f1947Dfd608EC6926", // DAO
    "0xf956d3f6324152af168b229a421D02c87824aE75"  // New Hires
]

exports.handler = async () => {
    var mainnetProvider = new ethers.providers.JsonRpcProvider(urlMainetProvider);
    var xDAIProvider = new ethers.providers.JsonRpcProvider(urlxDAIProvider);

    const token = new ethers.Contract(Token, TokenArtifact.abi, mainnetProvider)
    const token_xdai = new ethers.Contract(Token_xDAI, TokenArtifact.abi, xDAIProvider)

    let totalSupply = await token.totalSupply();

    console.log("totalSupply", ethers.utils.formatEther(totalSupply))
    let circulating = totalSupply;

    for (var i = 0; i < mainnet_sc.length; i++) {
        circulating = circulating.sub(await token.balanceOf(mainnet_sc[i]))
    }

    for (var i = 0; i < xdai_sc.length; i++) {
        circulating = circulating.sub(await token_xdai.balanceOf(xdai_sc[i]))
    }

    let result = { totalSupply: totalSupply.toString(), circulating: circulating.toString() }

    const response = {
        statusCode: 200,
        body: JSON.stringify(result),
    };
    return response;
};
