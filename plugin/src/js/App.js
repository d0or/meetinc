import React, { useState, useEffect } from "react";
import Event from "./Event"
import ContractInteraction from './lib/contractInteraction'

import createMetaMaskProvider from 'metamask-extension-provider'


//import { init } from 'ipfs/src/core/components';
//import { REDIRECT_URL, isEventOnEth, addToIpfs } from './lib/addEvent'

const web3Provider = createMetaMaskProvider()


export default function ({ props }) {

    const [account, setAccount] = useState("")
    const [network, setNetwork] = useState({})
    const [evt, setEvent] = useState({})
    const [currentTab, setCurrentTab] = useState(0)
    const [isOnEth, setIsOnEth] = useState(false)

    let contract = new ContractInteraction(web3Provider);

    useEffect(() => {
        web3Provider.send({ method: 'eth_requestAccounts' }, console.log);
        web3Provider.on('error', (error) => {
            console.error(error)
        })
        web3Provider.on('accountsChanged', (accs) => {
            setAccount(web3Provider.selectedAddress)
            contract = new ContractInteraction(web3Provider);
        })
        web3Provider.on('networkChanged', (accs) => {
            setNetwork(accs)
            contract = new ContractInteraction(web3Provider);
        })

    }, []);

    useEffect(() => {
        chrome.tabs.query(
            { currentWindow: true, active: true }, tabs => {
                setCurrentTab(tabs[0].id)
                chrome.runtime.sendMessage({
                    "action": "queryEvent",
                    tab: tabs[0].id
                }, response => {
                    console.log("event is:", response)
                    setEvent(response)
                })
            }
        )
    }, [])

    function addToIpfs() {
        chrome.runtime.sendMessage({
            "action": "storeInIPFS",
            payload: JSON.stringify(evt),
        }, response => {
            setEvent({ ...evt, cid: response.hash })
            checkEventOnEthereum(evt.url)
        })
    }

    const checkEventOnEthereum = () => {
        contract.isEventOnEth(evt.url).then(setIsOnEth)
    }

    const rsvp = () => {
        contract.rsvp(evt).then(result => console.log(result))
    }

    const addToContract = () => {
        contract.addEvent(evt).then(result => console.log(result))
    }

    return (
        <div>
            <div>Your account: {account}</div>
            <div>current event: {evt && <Event {...evt} />}</div>
            <button onClick={addToIpfs}>add to IPFS</button>
            {evt.cid &&
                (isOnEth
                    ? <button onClick={rsvp}>RSVP</button>
                    : <button onClick={addToContract}>add to Contract</button>
                )
            }
        </div>
    )
}
