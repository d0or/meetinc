import { ethers } from "ethers"
import abi from './abi'
import IPFS from 'ipfs'

export const REDIRECT_URL = 'https://build.elmariachi.now.sh/signup?url='

const NETWORK = 'ropsten'
const CONTRACT_ADDRESS = '0xe742EF468584506C32B86541d0c3d4878857Af66'; //'0xC4e47254c19102F55D8739181f9727FCE267564c'

const _ipfs = IPFS.create(); //{ repo: String(Math.random() + Date.now()) }

const provider = ethers.getDefaultProvider(NETWORK);
const contractAddress = CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, provider);

export const isEventOnEth = async (url) => {
    return await contract.isRegistered(url)
}

export const addToIpfs = async (payload) => {
    const ipfs = await _ipfs
    const [{ hash }] = await ipfs.add(payload)
    const data = await ipfs.cat(hash)
    return hash
}