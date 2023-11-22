import server from "./server";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes } from "ethereum-cryptography/utils";

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKeyhex = evt.target.value;
    const privateKey = hexToBytes(privateKeyhex)
    setPrivateKey(toHex(privateKey));
    const publicKey = secp.secp256k1.getPublicKey(privateKey);
    const address = toHex(publicKey);
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Type your Private Key: " value={privateKey} onChange={onChange}></input>
      </label>
      <div>
        Address: {address.slice(0, 10)}....
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
