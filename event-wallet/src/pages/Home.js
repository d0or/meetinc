import React, { useEffect, useState } from 'react'

import { client, getAllEvents } from "../lib/gqlClient.js"

import meetingContract from '../contracts/Meeting.json'
import { ethers } from "ethers"
import { provider } from '../lib/provider'

export default () => {
    const [balance, setBalance] = useState(0)
    const [meetups, setMeetups] = useState([])

    useEffect(() => {

        (async () => {
            const accounts = await provider.listAccounts();
            const acc0 = accounts[0]
            const b = await provider.getBalance(acc0)

            setBalance(b.toString())

            //const provider = ethers.getDefaultProvider('ropsten');

            const contractAddress = '0x55Fb10e4857293670446D2599A466E95fD5Ac0e8'; //'0xC4e47254c19102F55D8739181f9727FCE267564c';
            console.log(contractAddress)
            const contract = new ethers.Contract(contractAddress, meetingContract.abi, provider);
            const result = await contract.isRegistered("http://www.golem.de")
            console.log(result)

        })()

        return function cleanup() { }

    });
    /*useEffect(() => {

        (async () => {
            const evts = await getAllEvents()
            setMeetups(evts)
            console.log(evts)

        })()

        return function cleanup() { }

    }, []);
*/

    return <div>
        <h2>Your balance is {balance} !</h2>
        <ul>
            {meetups.map(m => (<li key={m.id}>{m.url} {m.ipfs.title}</li>))}
        </ul>
    </div>
}
