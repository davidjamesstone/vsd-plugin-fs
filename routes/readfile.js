const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'GET',
  path: '/readfile',
  options: {
    handler: async (request, h) => {
      const path = request.query.path

      try {
        return await fileutils.readFile(path)
      } catch (err) {
        return Boom.badRequest('Read file failed', err)
      }
    },
    validate: {
      query: {
        path: Joi.string().required()
      }
    }
  }
}
