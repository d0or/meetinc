import React from 'react'
import { Location } from '@reach/router'

export default () => {

    const submit = (evt) => {
        evt.preventDefault()
        const fd = new FormData(evt.currentTarget)
        var object = {};
        fd.forEach((value, key) => { object[key] = value });
        var json = JSON.stringify(object);
        console.log(json)
        return false;
    }

    const getQuery = (href) => {

        var l = document.createElement("a");
        l.href = href;

        var query = l.search.substring(1);
        var vars = query.split('&');
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

    return <Location>
        {props => {
            return <form onSubmit={submit}>
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