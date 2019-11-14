import React from 'react'

export default function ({ url, name, cid, description, startDate, image, eventStatus, offers, location, organizer }) {
    return (
        <div>
            {cid && <p>{cid}</p>}
            {name}
        </div>
    )
} 