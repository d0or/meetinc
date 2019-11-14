import IPFS from 'ipfs'

const events = {}
const ipfs = new IPFS()
ipfs.on('ready', () => {
  console.debug("ipfs node ready and listening")
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  console.debug(sender)
  console.debug(request)

  if (request.action == "eventDetected") {

    chrome.pageAction.hide(sender.tab.id);

    chrome.pageAction.setTitle({
      tabId: sender.tab.id,
      title: "rsvp to " + request.message.name
    });
    chrome.pageAction.setIcon({
      tabId: sender.tab.id,
      path: {
        '16': 'ticket16.png',
        '32': 'ticket32.png',
        '48': 'ticket48.png',
        '128': 'ticket128.png',
      }
    })
    events[sender.tab.id] = request.message;
    chrome.pageAction.show(sender.tab.id);

  } else if (request.action == "queryEvent") {
    sendResponse(events[request.tab]);
  } else if (request.action == "storeInIPFS") {
    ipfs.swarm.addrs().then(peerInfos => {
      console.debug(peerInfos)
    })

    ipfs.add(request.payload).then(ref => {
      ipfs.cat(ref[0].hash).then((data) => {
        sendResponse(ref[0])
      })
    })
  }
  return true; //https://github.com/mozilla/webextension-polyfill/issues/130
});

