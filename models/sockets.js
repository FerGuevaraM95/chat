const { userConnected, userDisconnected, getUsers, saveMessage } = require("../controllers/sockets");
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

            // Unir al ususario a una sala de socket.io
            socket.join(uid);

            // TODO: Validar el JWT
            // Si el token no es valido desconectar

            // TODO: Saber que usuario está activo mediante el UID

            // TODO: Emitir todos los usuarios conectados
            this.io.emit('list-users', await getUsers());

            // TODO: Socket join, uid,

            // TODO: Escuchar cuando el cliente manda un mensaje
            socket.on('personal-message', async (payload) => {
                const message = await saveMessage(payload);
                this.io.to(payload.to).emit('personal-message', message);
                this.io.to(payload.from).emit('personal-message', message);
            });

            // TODO: Disconnect
            // Marcar en la DB que el usuario se desconecto

            // TODO: Emitir todos los usuarios conectados
            
            socket.on('disconnect', async () => {
                await userDisconnected(uid);
                this.io.emit('list-users', await getUsers());
            })
        
        });
    }


}


module.exports = Sockets;