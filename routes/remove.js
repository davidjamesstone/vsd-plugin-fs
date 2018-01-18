const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'DELETE',
  path: '/remove',
  config: {
    handler: async (request, reply) => {
      const path = request.payload.path

      try {
        return await fileutils.remove(path)
      } catch (err) {
        return Boom.badRequest('Remove failed', err)
      }
    },
    validate: {
      payload: {
        path: Joi.string().required()
      }
    }
  }
}
