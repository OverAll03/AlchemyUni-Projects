const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
//const { hexToBytes } = require("ethereum-cryptography/utils");

const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log("private key:", privateKey)
console.log("private key to hex: ", toHex(privateKey));
//console.log("test: ", hexToBytes(toHex(privateKey)));

const publicKeyLong = secp.secp256k1.getPublicKey(privateKey);
const publicKey = keccak256(publicKeyLong.slice(1)).slice(
  publicKeyLong.length - 20
);

console.log("public key: ", toHex(publicKeyLong));
console.log("Public key formatted: ", toHex(publicKey));