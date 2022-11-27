const { Server } = require('socket.io')

const logger = require('./utils/logger')
const { rooms } = require('./constants')

const messageHandler = require('./handlers/message')

const createIoServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  })

  io.on('connection', async (socket) => {
    logger.info(`User connected with id:${socket.id}`)

    socket.join(`socket:${socket.id}`)
    socket.join(rooms.ALL_CONNECTED_SOCKETS_ROOM)

    messageHandler(io, socket)
  })

  return io
}

module.exports = {
  createIoServer
}
