import DOMtoString from './lib/DOMToString'
import WAE from 'web-auto-extractor'

const getEvent = entities => {
    if (entities.jsonld) {
        if (entities.jsonld.Event) {
            return entities.jsonld.Event[0]
        } else if (entities.jsonld.BusinessEvent) {
            return entities.jsonld.BusinessEvent[0]
        }
    }
    console.debug("not detected")
    return false;
}

(function run() {
    const source = DOMtoString(document)
    const entities = WAE().parse(source)
    const event = getEvent(entities)
    if (event) {
        console.debug("event detected")
        const message = {
            url: document.location.href,
            ...event
        }
        chrome.runtime.sendMessage({
            action: "eventDetected",
            message
        });
    }
})();


