dotenv = require("dotenv").config();
const {WebSocket} = require("ws");

const wss = new WebSocket.Server({port:process.env.PORT});

wss.on("connection", (ws)=>{
  ws.on("error", console.error);
  
  ws.on("message", (data)=>{
    console.log(data.toString());
    wss.clients.forEach((client)=> client.send(data.toString()));
  });
  console.log("usuario conectado com sucesso");
});
console.log(`conectado com sucesso na porta${process.env.PORT}`);
