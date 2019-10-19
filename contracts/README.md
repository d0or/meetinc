hello beautiful friend!

```
npm install
```

also required is truffle to be installed i guess.

try

```
truffle migrate
```

to compile and deploy to ganache or

```
truffle compile
```

to get the abi(?) in the build folder

##### update more complicated now!

we have a proxy contract. that requires zos to be installed globally

```
npm install zos-cli --global 
```

you need a secret.json to set up your infora account and the ethereum address for deployment

```
{
    "mnemonic": "task cruel magic deposit truck...", // minimum 12 words
    "infuraApiKey": "910019b0cf2d48bc....", // called project secret
    "infuraProjectId": "a484ad3e8315429da0a..." // called project id
}
```
use a [https://iancoleman.io/bip39/](mnemonic generator) and fund the address with a [https://faucet.ropsten.be](faucet).

and a session started with

```
zos session --network ropsten --expires 7200
```

to be able to run

```
zos push
```

to update the fcking smart contract on ropsten.

