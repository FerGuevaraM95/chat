const { userConnected, userDisconnected } = require("../controllers/sockets");
const { verifyJWT } = require("../helpers/jwt");
class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async ( socket ) => {


            const [isValid, uid] = verifyJWT(socket.handshake.query['x-token']);

            if(!isValid) {
                console.log('socket no identificado');
                return socket.disconnect();
            }

            await userConnected(uid);

            // TODO: Validar el JWT
            // Si el token no es valido desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados

            // TODO: Socket join, uid,

            // TODO: Escuchar cuando el cliente manda un mensaje
            // personal-message

            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconecto

            // TODO: Emitir todos los usuarios conectados
            
            socket.on('disconnect', async () => {
                await userDisconnected(uid);
            })
        
        });
    }


}


module.exports = Sockets;