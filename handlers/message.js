const logger = require('../utils/logger')
const {
  getRandom,
  getMultipleRandom
} = require('../helpers')
const {
  rooms,
  events
} = require('../constants')

module.exports = (io, socket) => {
  const blastMessageHandler = (payload) => {
    try {
      const parsedMessage = JSON.parse(payload)
      const { message } = parsedMessage

      socket.broadcast.emit(events.BROADCAST_MESSAGE_EVENT, message)
    } catch (error) {
      logger.error(`[Blast Message Event] SocketId: ${socket.id}, ${error}`)
    }
  }

  const spinMessageHandler = async (payload) => {
    try {
      const parsedMessage = JSON.parse(payload)
      const { message } = parsedMessage

      const connectedSockets = await io.in(rooms.ALL_CONNECTED_SOCKETS_ROOM).fetchSockets()
      const socketsIds = (connectedSockets.map(socket => socket.id)).filter(socketId => socketId !== socket.id)
      const randomSocketId = getRandom(socketsIds)
      io.to(`socket:${randomSocketId}`).emit(events.PRIVATE_MESSAGE_EVENT, message)
    } catch (error) {
      logger.error(`[Spin Message Event] SocketId: ${socket.id}, ${error}`)
    }
  }

  const wildMessageHandler = async (payload) => {
    try {
      const parsedMessage = JSON.parse(payload)
      const { numOfUsers, message } = parsedMessage

      const connectedSockets = await io.in(rooms.ALL_CONNECTED_SOCKETS_ROOM).fetchSockets()
      const socketsIds = (connectedSockets.map(socket => socket.id)).filter(socketId => socketId !== socket.id)
      const randomSocketsIds = getMultipleRandom(socketsIds, numOfUsers)
      for (const socketId of randomSocketsIds) {
        io.to(`socket:${socketId}`).emit(events.PRIVATE_MESSAGE_EVENT, message)
      }
    } catch (error) {
      logger.error(`[Wild Message Event] SocketId: ${socket.id}, ${error}`)
    }
  }

  socket.on('blast', blastMessageHandler)
  socket.on('spin', spinMessageHandler)
  socket.on('wild', wildMessageHandler)
}
