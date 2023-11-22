const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const privKeys = [
  "1f30c21e2d13a64d770fbb1a3f3c40a7e222f2a78978f38998384f6f783f5e9c",
  "6b3c0625d6f1e79159e354863d45f55b30b8961d1343b53f32a373dae8c23f09",
  "60c2a86e0915e540eaa6f50afe9c05022fd6429a72d3c8b5d3e0d3b8e8528509"
]

const balances = {
  "03483a347e09e5235be68e34b09affb6b10befc8173dc52f40b5488f9e19ec555a": 200,
  "023586dcdb162a3f72562ff2b923f1ff066da96c26a2a9af363c3ba68aaeb2612d": 50,
  "0346944462287f5f69054120108d486721e792d344dc78dcfab87c8a3a74023979": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
};