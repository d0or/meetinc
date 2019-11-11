import { REDIRECT_URL, isEventOnEth, addToIpfs } from './lib/addEvent'

const events = {}

chrome.pageAction.onClicked.addListener(async (tab) => {

  const event = events[tab.id];
  const isOnEth = await isEventOnEth(event.url)

  let redirect = REDIRECT_URL + encodeURI(event.url);
  if (!isOnEth) {
    const cid = await addToIpfs(JSON.stringify(event))
    redirect += '&cid=' + cid
  }
  console.log(redirect)

  return false;
})

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == "eventDetected") {
    console.log(sender)
    console.log(request)
    chrome.pageAction.setTitle({
      tabId: sender.tab.id,
      title: "rsvp to " + request.message.name
    });
    events[sender.tab.id] = request.message;
    chrome.pageAction.show(sender.tab.id);
  }
});
