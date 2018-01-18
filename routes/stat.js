const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'GET',
  path: '/stat',
  config: {
    handler: async (request, reply) => {
      const path = request.query.path

      try {
        return await fileutils.stat(path)
      } catch (err) {
        return Boom.badRequest('Stat failed', err)
      }
    },
    validate: {
      query: {
        path: Joi.string().required()
      }
    }
  }
}
