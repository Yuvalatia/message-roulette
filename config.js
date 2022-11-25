require('dotenv').config()

module.exports = {
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD
}
