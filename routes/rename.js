const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'PUT',
  path: '/rename',
  config: {
    handler: async (request, h) => {
      const payload = request.payload
      const oldPath = payload.oldPath
      const newPath = payload.newPath

      try {
        return await fileutils.rename(oldPath, newPath)
      } catch (err) {
        return Boom.badRequest('Rename failed', err)
      }
    },
    validate: {
      payload: {
        oldPath: Joi.string().required(),
        newPath: Joi.string().required()
      }
    }
  }
}
