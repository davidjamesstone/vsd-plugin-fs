'use strict'
const routes = require('./routes')

exports.register = function (server, options, next) {
  var mount = options.mount

  if (mount) {
    routes.forEach(function (route) {
      route.path = mount + route.path
    })
  }

  server.route(routes)

  next()
}

exports.register.attributes = {
  pkg: require('./package.json')
}
