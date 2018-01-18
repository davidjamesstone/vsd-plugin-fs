const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'POST',
  path: '/copy',
  options: {
    handler: async (request, h) => {
      const payload = request.payload
      const source = payload.source
      const destination = payload.destination

      try {
        return await fileutils.copy(source, destination)
      } catch (err) {
        return Boom.badRequest('Copy failed', err)
      }
    },
    validate: {
      payload: {
        source: Joi.string().required(),
        destination: Joi.string().required()
      }
    }
  }
}
