const Joi = require('joi')
const Boom = require('boom')
const fileutils = require('../file-system-utils')

module.exports = {
  method: 'PUT',
  path: '/writefile',
  config: {
    handler: async (request, h) => {
      const path = request.payload.path
      const contents = request.payload.contents

      try {
        return await fileutils.writeFile(path, contents)
      } catch (err) {
        return Boom.badRequest('Write file failed', err)
      }
    },
    validate: {
      payload: {
        path: Joi.string().required(),
        contents: Joi.string().allow('')
      }
    }
  }
}
