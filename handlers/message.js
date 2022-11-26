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
    socket.broadcast.emit(events.BROADCAST_MESSAGE_EVENT, payload)
  }

  const spinMessageHandler = async (payload) => {
    const connectedSockets = await io.in(rooms.ALL_CONNECTED_SOCKETS_ROOM).fetchSockets()
    const socketsIds = (connectedSockets.map(socket => socket.id)).filter(socketId => socketId !== socket.id)
    const randomSocketId = getRandom(socketsIds)
    io.to(`socket:${randomSocketId}`).emit(events.PRIVATE_MESSAGE_EVENT, payload)
  }

  const wildMessageHandler = async (payload) => {
    const number = 2
    const connectedSockets = await io.in(rooms.ALL_CONNECTED_SOCKETS_ROOM).fetchSockets()
    const socketsIds = (connectedSockets.map(socket => socket.id)).filter(socketId => socketId !== socket.id)
    const randomSocketsIds = getMultipleRandom(socketsIds, number)
    for (const socketId of randomSocketsIds) {
      io.to(`socket:${socketId}`).emit(events.PRIVATE_MESSAGE_EVENT, payload)
    }
  }

  socket.on('blast', blastMessageHandler)
  socket.on('spin', spinMessageHandler)
  socket.on('wild', wildMessageHandler)
}
