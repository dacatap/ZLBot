const qrcode = require("qrcode-terminal");
const mongoose = require("mongoose");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { sendMedia, sendMessage } = require("./send");
require("dotenv/config");
//Guarda los datos de autenticación a un archivo
const client = new Client({
  authStrategy: new LocalAuth(),
});

const listenMessage = () => client.on('message', async msg =>{
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, "Error de conección con base de datos"));
  const {from, body, hasMedia} = msg;
  message = body.toLowerCase();
  console.log(message);
  const collection = db.collection('Flow');

  collection.findOne({'keywords':message}, 'replmess', function(err, answ){
    console.log(answ);
    try {
      sendMessage(client, from, answ.replmess);
    } catch (err) {
      const defaultmessage = "No entiendo lo que me estás diciendo, ¿te parece empezar la conversación de nuevo desde un _*saludo*_?";
      sendMessage(client, from, defaultmessage);
    }
  });
});

mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected to DB"));
client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", () => {
  console.log("Client is ready!");
  listenMessage();
});