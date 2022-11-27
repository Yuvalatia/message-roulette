const httpServer = require('http').createServer()
// const { Server } = require('socket.io')
const { createAdapter } = require('@socket.io/redis-adapter')
const { createIoServer } = require('./ioserver')

const config = require('./config')
const { createConnection } = require('./db/redis')
const logger = require('./utils/logger')

const io = createIoServer(httpServer)

const pubRedisClient = createConnection()
const subRedisClient = pubRedisClient.duplicate()

Promise.all([pubRedisClient.connect(), subRedisClient.connect()]).then(() => {
  io.adapter(createAdapter(pubRedisClient, subRedisClient))

  httpServer.listen(config.SERVER_PORT, () => {
    logger.info(`Server is running on port ${config.SERVER_PORT}`)
  })
})
