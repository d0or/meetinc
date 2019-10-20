import WAE from 'web-auto-extractor'
import { ethers } from "ethers"
import abi from './abi';
import IPFS from 'ipfs'

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
            case Node.ELEMENT_NODE:
                html += node.outerHTML;
                break;
            case Node.TEXT_NODE:
                html += node.nodeValue;
                break;
            case Node.CDATA_SECTION_NODE:
                html += '<![CDATA[' + node.nodeValue + ']]>';
                break;
            case Node.COMMENT_NODE:
                html += '<!--' + node.nodeValue + '-->';
                break;
            case Node.DOCUMENT_TYPE_NODE:
                // (X)HTML documents are identified by public identifiers
                html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
                break;
        }
        node = node.nextSibling;
    }
    return html;
}

const eventOnEth = async (url) => {
    const provider = ethers.getDefaultProvider('ropsten');
    const contractAddress = '0x55Fb10e4857293670446D2599A466E95fD5Ac0e8'; //'0xC4e47254c19102F55D8739181f9727FCE267564c';
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const result = await contract.isRegistered(url)
    return result;
}

const addToIpfs = async (ipfs, payload) => {
    const [{ hash }] = await ipfs.add(payload)
    const data = await ipfs.cat(hash)
    console.log(data)
    return hash
}

function sendResult(result){
    chrome.runtime.sendMessage(result, function (response) {
       console.log("done");
    });

    if (result.redirect) {
        document.location.href = result.redirect;
    }
}

IPFS.create({ repo: String(Math.random() + Date.now()) }).then(ipfs => {
    var documentAsString = DOMtoString(document)
    var parsed = WAE().parse(documentAsString)
    if (parsed.jsonld && parsed.jsonld.Event) {
        // console.log(parsed.jsonld.Event)
        const url = document.location.href
        const redirectUrl = 'https://build.elmariachi.now.sh/signup?url='
        return eventOnEth(url).then(res => {
            if (res === true) {
                // alert("this event already is tracked on Eth. Join it!");

                sendResult({
                    redirect: encodeURI(redirectUrl + url),
                    cid: null
                });                
            } else {
                return addToIpfs(ipfs, JSON.stringify(parsed.jsonld.Event)).then(hash => {
                    // alert("this event is not tracked on Eth yet. We added its metadata" + hash)
                    //const data = await node.cat(hash)
                    
                    sendResult({
                        redirect: encodeURI(redirectUrl + url + '&cid=' + hash),
                        cid: hash
                    });
                });
            };
        })
    } else {
        sendResult({
            redirect: null,
            cid: null
        });
    }
});
