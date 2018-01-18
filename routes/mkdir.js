const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'POST',
  path: '/mkdir',
  options: {
    handler: async (request, h) => {
      const path = request.payload.path

      try {
        return await fileutils.mkdir(path)
      } catch (err) {
        return Boom.badRequest('Make directory failed', err)
      }
    },
    validate: {
      payload: {
        path: Joi.string().required()
      }
    }
  }
}
