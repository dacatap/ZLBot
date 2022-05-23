const fs = require('fs');
const {Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const SESSION_FILE_PATH = './session.json';
let client;
let sessionData;

const withSession = () => {

}

/** Función encargada de crear el qr code cuando no se ha iniciado previamente una sesión */
const withoutSession = () => {
    console.log('No hay una sesión iniciada');
    client = new Client();
    client.on('qr', qr=>{
        qrcode.generate(qr, {small: true});
    })

    client.on('authenticated', session =>{
        sessionData = session;
        fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), function (err) {
            if (err) {
                console.log(err);
            }
        });
    });

    client.initialize();
}


(fs.existsSync(SESSION_FILE_PATH)) ? withSession() : withoutSession();