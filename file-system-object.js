const p = require('path')
const filesize = require('filesize')

const FileSystemObject = function (path, stat) {
  this.name = p.basename(path) || path
  this.path = path
  this.dir = p.dirname(path)
  this.isDirectory = typeof stat === 'boolean' ? stat : stat.isDirectory()
  this.isFile = !this.isDirectory
  this.ext = p.extname(path)
  this.stat = stat
  this.filesize = filesize(this.stat.size, { bits: true, round: 0 })
}
module.exports = FileSystemObject
