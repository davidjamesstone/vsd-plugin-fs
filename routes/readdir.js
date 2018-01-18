const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'GET',
  path: '/readdir',
  options: {
    handler: async (request, h) => {
      const path = request.query.path

      try {
        return await fileutils.readDir(path)
      } catch (err) {
        return Boom.badRequest('Read dir failed', err)
      }
    },
    validate: {
      query: {
        path: Joi.string().required()
      }
    }
  }
}
