module.exports = {
  extend: Object.assign,
  rndstr: function () {
    return (+new Date()).toString(36)
  },
  getuid: function () {
    return ('' + Math.random()).replace(/\D/g, '')
  }
}
