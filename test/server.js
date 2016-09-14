const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.start((err) => {
  if (err) {
    throw err
  }

  server.register({
    register: require('..'),
    options: {
      mount: '/fs'
    }
  }, (err) => {
    if (err) {
      throw err
    }
  })

  console.log('Server running at:', server.info.uri)
})
