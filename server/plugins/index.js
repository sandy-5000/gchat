import { createServer } from 'http'
import { Server } from 'socket.io'

export default defineNitroPlugin((nitro) => {
    const httpServer = createServer()

    const metaData = {
        count: 0
    }

    const io = new Server(httpServer, {
        cors: {
            origin: "*",
        },
    })
    
    io.on('connection', (socket) => {
        console.log(socket.id + ' : connection')
        socket.on('connected', (data) => {
            console.log(data)
            metaData.count += 1
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

    io.listen(4000, () => {
        console.log('Socket on 4000')
    })
})
