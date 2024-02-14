A remplir avec vos clés ECDSA

Ce genre de script NodeJS qui utilise `node:crypto` peut vous aider à créer les clés. Sinon, OpenSSL le fera

```
const {generateKeyPair, createHash} = await import('node:crypto')

const curve = "secp256k1";

generateKeyPair('ec', {
namedCurve: curve,
publicKeyEncoding: {type: 'spki', format: 'pem'},
privateKeyEncoding: {type: 'pkcs8', format: 'pem'},
}, (err, publicKey, privateKey) => {
if (!err) {
console.log("Private key:\n", privateKey.toString('base64'));
console.log("Public key:\n", publicKey.toString('base64'));

            writeFile("ecdsa.pri", privateKey.toString('base64'), (err) => {
                if(err) {
                    console.log("err")
                }
                else{
                    console.log("ecriture ok")
                }
            })

            writeFile("ecdsa.pub", publicKey.toString('base64'), (err) => {
                if(err) {
                    console.log("err")
                }
                else{
                    console.log("ecriture ok")
                }
            })

        }
    }
)
```