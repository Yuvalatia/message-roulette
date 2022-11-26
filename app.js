const httpServer = require('http').createServer()
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')

const config = require('./config')
const { createConnection } = require('./db/redis')
const logger = require('./utils/logger')
const { rooms } = require('./constants')
const messageHandler = require('./handlers/message')

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const pubRedisClient = createConnection()
const subRedisClient = pubRedisClient.duplicate()

Promise.all([pubRedisClient.connect(), subRedisClient.connect()]).then(() => {
  io.adapter(createAdapter(pubRedisClient, subRedisClient))

  io.on('connection', async (socket) => {
    logger.info(`User connected with id:${socket.id}`)

    socket.join(`socket:${socket.id}`)
    socket.join(rooms.ALL_CONNECTED_SOCKETS_ROOM)

    messageHandler(io, socket)
  })
  httpServer.listen(config.SERVER_PORT, () => {
    logger.info(`Server is running on port ${config.SERVER_PORT}`)
  })
})
