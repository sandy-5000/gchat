import { Server } from 'socket.io'

export default defineNitroPlugin((nitro) => {
    console.log(nitro)
    const io = new Server(nitro.server.httpServer, {
        cors: {
            origin: "*",
        },
    })
    io.on('connection', (socket) => {
        console.log(`Connected ${socket}`)
        socket.on('my-event', (data) => {
            console.log(data)
            io.emit('server-event', 'Hello from the server!')
        })
    })
})
