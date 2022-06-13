const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { MessageMedia } = require('whatsapp-web.js');

//Guarda los datos de autenticación a un archivo
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on("ready", () => {
  console.log("Client is ready!");
});

const sendMessage = (to, message) =>{
    client.sendMessage(to, message);
}

const sendMedia = (to, file) =>{
    const mediaFile = MessageMedia.fromFilePath(`./mediaSend/${file}`);
    client.sendMessage(to, mediaFile);
}

client.on("message", (message) => {
  const {from, to, body} =message;
  switch (body){
        case 'hello':
            sendMessage(from, 'Hola, soy un bot, para continuar la conversación por favor envía las palabras "temp", "mtest" o "dtest"');
            break;
        case 'temp':
            sendMessage(from, 'Ps esto funciona, bien hecho yo :-)');
            break;
        case 'mtest':
            sendMedia(from, 'mim.jpg');
            break;
        case 'dtest':
            sendMedia(from, 'plumas.pdf');
            break;
  }
});