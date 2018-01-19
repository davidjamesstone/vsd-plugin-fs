const routes = require('./routes')

module.exports = {
  plugin: {
    pkg: require('./package.json'),
    register: (server, options) => {
      server.route(routes)
    }
  }
}
