import { Server } from 'socket.io'

export default defineEventHandler(event => {
    if (globalThis.io) {
        return
    }
    const server = event.node.res.socket?.server
    const io = new Server(server, {
        path: '/api/socket.io/',
        cors: {
            origin: "*",
        },
    })
    const metaData = {
        count: 0
    }
    globalThis.io = io
    io.on('connection', (socket) => {
        console.log(socket.id + ' : connection')
        socket.on('connected', (data) => {
            console.log(data)
            metaData.count += 1
            console.log('count', metaData.count)
            io.emit('online', metaData)
        })
        socket.on('message', (data) => {
            io.emit('broadcast', data)
        })
        socket.on("disconnect", function () {
            metaData.count -= 1
            io.emit('online', metaData)
            console.log(socket.id + " : disconnected")
        })
    })
})