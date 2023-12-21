const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const server = require('http').Server(app);

let activeIDs = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/addId",(req,res) => {
  const sentId = req.body.ID;
  const sentKey = req.body.publicKey;
  console.log(sentId,sentKey);
  activeIDs.push({sentId,sentKey});
});

setInterval(() => {
  activeIDs = [];
},5000)

app.post("/removeId",(req,res) => {
  console.log("in remove");
  const sentId = req.body.id;
  active = activeIDs.filter(x => x != sentId);
  res.sendStatus(200);
})


app.get("/getCurrentIds",(req,res) => {
  console.log("in get current");
  res.send(activeIDs.filter(x => x.ID));
  return;
})

app.get("/",(req,res) => {
  res.sendFile(path.join(__dirname,"/index.html"))
})

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

const ExpressPeerServer = require('peer').ExpressPeerServer;

const options = {
  debug: true
};

const peerServer = ExpressPeerServer(server, options);

app.use('/peerjs', peerServer);