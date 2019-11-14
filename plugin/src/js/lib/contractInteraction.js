import { ethers } from "ethers"
//import Web3 from 'web3'
import abi from './abi.json'
import strToArr from './strToArr'

const NETWORK = 'ropsten'
const CONTRACT_ADDRESS = '0xe742EF468584506C32B86541d0c3d4878857Af66'; //'0xC4e47254c19102F55D8739181f9727FCE267564c'

export default class ContractInteraction {
    constructor(web3Provider) {
        this.provider = new ethers.providers.Web3Provider(web3Provider)
        const signer = this.provider.getSigner();
        this.contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

    }

    async isEventOnEth(url) {
        return await this.contract.isRegistered(url)
    }

    async addEvent(event) {
        const accounts = await this.provider.listAccounts();
        const acc0 = accounts[0]
        const b = await this.provider.getBalance(acc0)
        console.log(b)

        const cidBytes = strToArr(event.cid)
        const result = await this.contract.rsvpForEvent(event.url, cidBytes)
        return result
    }
    async rsvp(event) {
        const result = await this.contract.rsvpForExistingEvent(event.url)
        return result
    }
}

