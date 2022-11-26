const { getRandom } = require('../helpers')
const { roomNames } = require('../constants')

module.exports = (io, socket) => {
  const blastMessageHandler = (payload) => {
    socket.broadcast.emit('blast', payload)
  }

  const spinMessageHandler = async (payload) => {
    const connectedSockets = await io.in(roomNames.ALL_CONNECTED_SOCKETS_ROOM).fetchSockets()
    const socketsIds = connectedSockets.map(socket => socket.id)
    const randomSocketId = getRandom(socketsIds)
    io.to(`socket:${randomSocketId}`).emit(payload)
  }

  socket.on('blast', blastMessageHandler)
  socket.on('spin', spinMessageHandler)
}
