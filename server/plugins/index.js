import { createServer } from 'http'
import { Server } from 'socket.io'

export default defineNitroPlugin((nitro) => {
    const httpServer = createServer()

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    })
    
    io.on('connection', (socket) => {
        console.log(socket.id + ' : connection')
        socket.on('connected', (data) => {
            console.log(data)
            io.emit('server-reply', 'Hello from the server!')
        })
        socket.on('message', (data) => {
            io.emit('broadcast', data)
        })
        socket.on("disconnect", function () {
            console.log(socket.id + " : disconnected")
        })
    })

    io.listen(4000)
})
