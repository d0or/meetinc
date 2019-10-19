import React, { useEffect, useState } from 'react'

import { client, getAllEvents } from "../lib/gqlClient.js"

//import abi from '../../../contracts/build/contracts/Meeting.json'

import { provider, wallet } from '../lib/provider'

const events =
    [
        {
            id: '123-456',
            url: 'https://meetup.com/test',
            title: 'ding',
            starts: '2019-11-01',
            ends: '2019-11-05',
            image: '',
            venue: {
                location: {

                }
            }
        }
    ]

export default () => {
    const [balance, setBalance] = useState(0)
    const [meetups, setMeetups] = useState([])

    /*useEffect(() => {

        (async () => {
            const accounts = await provider.listAccounts();
            const acc0 = accounts[0]
            const b = await provider.getBalance(acc0)

            setBalance(b.toString())

        })()

        return function cleanup() { }

    });*/
    useEffect(() => {

        (async () => {
            const evts = await getAllEvents()
            setMeetups(evts)
            console.log(evts)

        })()

        return function cleanup() { }

    }, []);


    return <div>
        <h2>Your balance is none !</h2>
        <ul>
            {meetups.map(m => (<li key={m.id}>{m.url} {m.ipfs.title}</li>))}
        </ul>
    </div>
}
