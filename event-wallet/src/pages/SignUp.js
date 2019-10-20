import React from 'react'
import { Location } from '@reach/router'

import { ethers } from "ethers"
import { provider } from '../lib/provider'
import IPFS from 'ipfs'
import meetingContract from '../contracts/Meeting.json'

export default () => {

    const submit = (evt) => {
        evt.preventDefault()
        const fd = new FormData(evt.currentTarget)
        var object = {};
        fd.forEach((value, key) => { object[key] = value });

        rsvpForEvent(object);

        return false;
    }

    const getQuery = (href) => {

        var l = document.createElement("a");
        l.href = href;

        var query = l.search.substring(1);
        var vars = query.split('&');
        console.log(vars)
        const result = {};

        vars.forEach(v => {
            const pair = v.split('=')
            result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        })
        return result

    }

    function getUrl(href) {
        return getQuery(href).url
    }
    function getCid(href) {
        return getQuery(href).cid
    }

    function resolveContent() {

    }

    function strToArr(str) {
        var data = [];
        for (var i = 0; i < str.length; i++) {
            data.push(str.charCodeAt(i));
        }
        return data
    }

    async function rsvpForEvent(urlAndCid) {
        console.log(urlAndCid)

        const accounts = await provider.listAccounts();
        const acc0 = accounts[0]
        console.log(acc0)
        const b = await provider.getBalance(acc0)
        var signer = provider.getSigner();

        //const provider = ethers.getDefaultProvider('ropsten');

        const contractAddress = '0xe742EF468584506C32B86541d0c3d4878857Af66';

        const contract = new ethers.Contract(contractAddress, meetingContract.abi, signer);
        const cidBytes = strToArr(urlAndCid.cid)
        console.log(cidBytes)

        let result = null
        if (cidBytes !== null) {
            result = await contract.rsvpForEvent(urlAndCid.url, cidBytes)
        } else {
            result = await contract.rsvpForExistingEvent(urlAndCid.url)
        }

        console.log(result)
    }

    function getIpfsData(cid) {
        let data = {};
        if (cid != null && cid.length > 0) {
            let dataBytes = (IPFS.cat(cid))
            if (dataBytes != null && dataBytes.toString().length > 0) {
                console.log.warning('DEBUG IPFS {}', [dataBytes.toString()])
                let json = json.fromBytes(dataBytes)
                data = json.toObject()
            } else {
                console.log.warning('DEBUG IPFS SKIPPING {}', [cid])
            }
            return data;
        }
        return null;
    }

    return <Location>
        {props => {
            return <form onSubmit={submit}>
                <input type="hidden" name="cid" value={getCid(props.location.href)} />
                <div className="field">
                    <label className="label"> Event URL</label>
                    <div className="control">
                        <input className="input" type="text" name="url" placeholder="url" value={getUrl(props.location.href)} />
                    </div>
                </div>
                <div className="control">
                    <button className="button is-primary">RSVP</button>
                </div>
            </form>

        }}
    </Location>


}