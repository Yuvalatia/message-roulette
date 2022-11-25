const httpServer = require('http').createServer()
const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')

const config = require('./config')
const { createConnection } = require('./db/redis')
const logger = require('./utils/logger')
const messageHandler = require('./handlers/message')

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

const pubRedisClient = createConnection()
const subRedisClient = pubRedisClient.duplicate()

pubRedisClient.on('ready', () => {
  console.log('Publisher connected to redis and ready to use')
})
subRedisClient.on('ready', () => {
  console.log('Subscriber connected to redis and ready to use')
})

Promise.all([pubRedisClient.connect(), subRedisClient.connect()]).then(() => {
  io.adapter(createAdapter(pubRedisClient, subRedisClient))

  io.on('connection', async (socket) => {
    logger.info(`User connected with id:${socket.id}`)
    socket.join(`socket:${socket.id}`)
    socket.join('socket:all')

    messageHandler(io, socket)
  })
  httpServer.listen(config.SERVER_PORT, () => {
    logger.info(`Server is running on port ${config.SERVER_PORT}`)
  })
})
