const { createClient } = require('redis')

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD
} = require('../../config')
const logger = require('../../utils/logger')

const createConnection = () => {
  const connection = createClient({
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT
    },
    username: REDIS_USERNAME,
    password: REDIS_PASSWORD
  })

  connection.on('error', (error) => {
    logger.error(`[REDIS] ${error}`)
  })

  return connection
}

module.exports = {
  createConnection
}
