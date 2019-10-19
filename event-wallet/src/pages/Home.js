import React, { useEffect, useState } from 'react'

import provider from '../lib/provider'


const events =
    [
        {
            title: 'Diffusion 2001',
            date: '2019-11-01'
        }
    ]

export default () => {
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        provider.getGasPrice().then((gasPrice) => {
            const gasPriceString = gasPrice.toString();

            console.log("Current gas price: " + gasPriceString);
        });

        return function cleanup() { }
    });

    return <div>
        <h2>Welcome!</h2>

    </div>
}
