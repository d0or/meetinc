import WAE from 'web-auto-extractor';
import axios from 'axios';

const pageUrl = 'http://localhost:8081'; //'https://www.meetup.com/coding-stuttgart/events/264920252/';

export default () => {
    axios.get(pageUrl).then((response) => {
        console.log(response.data);

        //const wae = WAE();
        //const parsed = wae.parse(body);
        //console.log(parsed.jsonld.Event);
    });
};


