const routes = require('./routes')

module.exports = {
  plugin: {
    pkg: require('./package.json'),
    register: (server, options) => {
      // const mount = options.mount

      // if (mount) {
      //   routes.forEach(function (route) {
      //     route.path = mount + route.path
      //   })
      // }

      server.route(routes)
    }
  }
}
