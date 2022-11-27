const { createServer } = require('http')
const Client = require('socket.io-client')

const { createIoServer } = require('../../ioserver')
const { events } = require('../../constants')

describe('my awesome project', () => {
  let io, clientSocket, anotherClientSocket

  beforeAll((done) => {
    const httpServer = createServer()
    io = createIoServer(httpServer)
    httpServer.listen(() => {
      const port = httpServer.address().port
      clientSocket = new Client(`http://localhost:${port}`)
      anotherClientSocket = new Client(`http://localhost:${port}`)
      clientSocket.on('connect', done)
    })
  })

  afterAll(() => {
    io.close()
    clientSocket.close()
    anotherClientSocket.close()
  })

  test('Blast message test', (done) => {
    const message = 'Hi everyone'
    anotherClientSocket.on(events.BROADCAST_MESSAGE_EVENT, (arg) => {
      expect(arg).toBe(message)
      done()
    })
    clientSocket.emit('blast', JSON.stringify({ message }))
  })

  test('Spin message test', (done) => {
    const message = 'Hi random user'
    anotherClientSocket.on(events.PRIVATE_MESSAGE_EVENT, (arg) => {
      expect(arg).toBe(message)
      done()
    })
    clientSocket.emit('spin', JSON.stringify({ message }))
  })

  test('Wild message test', (done) => {
    const message = 'Hi random user'
    const numOfUsers = 1
    anotherClientSocket.on(events.PRIVATE_MESSAGE_EVENT, (arg) => {
      expect(arg).toBe(message)
      done()
    })
    clientSocket.emit('wild', JSON.stringify({ message, numOfUsers }))
  })
})
