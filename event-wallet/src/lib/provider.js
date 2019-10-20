import { ethers } from "ethers"

window.ethereum.enable();
const provider = new ethers.providers.Web3Provider(window.web3.currentProvider);


export {
    provider,
    //wallet
}