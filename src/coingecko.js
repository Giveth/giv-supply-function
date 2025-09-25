const ethers = require("ethers");
const urlxDAIProvider = "https://rpc.gnosischain.com";
const urlMainetProvider = "https://ethereum.publicnode.com";
const urlOptimismProvider = "https://mainnet.optimism.io";
const urlPolygonzkEVMProvider = "https://rpc.polygon-zkevm.gateway.fm";

const TokenArtifact = require("./abi/GIV.json");
const BridgedTokenArtifact = require("./abi/GIV-Bridged-L2.json");

const Token = "0x900db999074d9277c5da2a43f252d74366230da0";
const Token_xDAI = "0x4f4F9b8D5B4d0Dc10506e5551B0513B61fD59e75";
const Token_optimism = '0x528CDc92eAB044E1E39FE43B9514bfdAB4412B98';
const Token_polygonzkEVM = '0xddafb91475bbf6210a151fa911ac8fda7de46ec2';

const mainnet_sc = [
    "0x87dE995F6744B75bBe0255A973081142aDb61f4d", // Token Distro
    "0xf924fF0f192f0c7c073161e0d62CE7635114e74f", // Liquidity Safe
    "0x2B0ee142dCFE7C2dD150cDbd7B6832F6e9977f51", // OneGIV Liquidity Multisig
];

const xdai_sc = [
    "0xc0dbDcA66a0636236fAbe1B3C16B1bD4C84bB1E1", // Token Distro
    "0xe70494225312c6b1167c15134dab66730f36708d", // Giveth Treasury
    "0xf4ef9a155dd268e321afa7b9391e0602a7b09588", // GIVgarden Common Pool
    "0xf924fF0f192f0c7c073161e0d62CE7635114e74f", // Liquidity Safe
    "0xd10BAC02a02747cB293972f99981F4Faf78E1626", // GIVgarden Multisig Wallet
    "0x0018C6413BFE5430ff9ba4bD7ac3B6AA89BEBD9b", // nrGIV multisig
];

const optimism_sc = [
    '0xE3Ac7b3e6B4065f4765d76fDC215606483BF3bD1', // Token Distro
    '0xf924fF0f192f0c7c073161e0d62CE7635114e74f', // Liquidity Safe
    "0x0018C6413BFE5430ff9ba4bD7ac3B6AA89BEBD9b", // nrGIV multisig
];

const PolygonzkEVM_sc = [
    '0x4fB9B10ECDe1b048DBC79aBEAB3793edc93a0d54', // Token Distro
    '0xaF4D68B8084b01D2c8120120497511035A2ea3a1', // Giveth Multisig
    '0xa1769a425EA1197f32d8C3e0fbE3F92EaDACC21A', // Multisig liquidity
];

async function calculateTokenSupplyCG() {
    const mainnetProvider = new ethers.providers.JsonRpcProvider(urlMainetProvider);
    const xDAIProvider = new ethers.providers.JsonRpcProvider(urlxDAIProvider);
    const optimismProvider = new ethers.providers.JsonRpcProvider(urlOptimismProvider);
    const polygonzkEVMProvider = new ethers.providers.JsonRpcProvider(urlPolygonzkEVMProvider);

    const token = new ethers.Contract(Token, TokenArtifact.abi, mainnetProvider);
    const token_xdai = new ethers.Contract(Token_xDAI, TokenArtifact.abi, xDAIProvider);
    const token_optimism = new ethers.Contract(Token_optimism, BridgedTokenArtifact, optimismProvider);
    const token_polygonzkEVM = new ethers.Contract(Token_polygonzkEVM, BridgedTokenArtifact, polygonzkEVMProvider);

    const totalSupply = await token.totalSupply();
    let circulating = totalSupply;

    const mainnet_sc_promises = mainnet_sc.map(item => token.balanceOf(item));
    const xdai_sc_promises = xdai_sc.map(item => token_xdai.balanceOf(item));
    const optimism_sc_promises = optimism_sc.map(item => token_optimism.balanceOf(item));
    const polygonzkEVM_sc_promises = PolygonzkEVM_sc.map(item => token_polygonzkEVM.balanceOf(item));

    const mainnet_values = await Promise.all(mainnet_sc_promises);
    mainnet_values.forEach(value => {
        circulating = circulating.sub(value);
    });

    const xdai_values = await Promise.all(xdai_sc_promises);
    xdai_values.forEach(value => {
        circulating = circulating.sub(value);
    });

    const optimism_values = await Promise.all(optimism_sc_promises);
    optimism_values.forEach(value => {
        circulating = circulating.sub(value);
    });

    const polygonzkEVM_values = await Promise.all(polygonzkEVM_sc_promises);
    polygonzkEVM_values.forEach(value => {
        circulating = circulating.sub(value);
    });

    return {
        totalSupply: totalSupply.toString(),
        circulating: circulating.toString(),
    };
}

module.exports = { calculateTokenSupplyCG };