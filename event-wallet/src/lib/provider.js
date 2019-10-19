import { ethers } from "ethers"

let provider;

provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

export default provider