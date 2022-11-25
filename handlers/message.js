module.exports = (io, socket) => {
  const blastMessageHandler = (payload) => {
    socket.broadcast.emit('blast', payload)
  }

  socket.on('blast', blastMessageHandler)
}
