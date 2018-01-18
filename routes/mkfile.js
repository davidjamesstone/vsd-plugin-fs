const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'POST',
  path: '/mkfile',
  config: {
    handler: async (request, h) => {
      const path = request.payload.path

      try {
        return await fileutils.writeFile(path, '')
      } catch (err) {
        return Boom.badRequest('Make file failed', err)
      }
    },
    validate: {
      payload: {
        path: Joi.string().required()
      }
    }
  }
}
