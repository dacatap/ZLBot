const {MessageMedia} =require('whatsapp-web.js');
const fs = require('fs');


const sendMedia = (client,number, fileName) => {
    const file = `./mediaSend/${fileName}`;
    if(fs.existsSync(file)){
        const media = MessageMedia.fromFilePath(file);
        client.sendMessage(number, media, { sendAudioAsVoice: true });
    }
};

const sendMessage = async (client, number, text) =>{
    const message = text;
    console.log(message);
    client.sendMessage(number,message);
    console.log("Enviando mensaje");
}

module.exports = {sendMessage, sendMedia}