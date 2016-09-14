const fs = require('fs')
const path = require('path')
const isUtf8 = require('is-utf8')
const p = require('path')
const common = require('./common')
const ncp = require('ncp').ncp
const FileSystemObject = require('./file-system-object')
const rimraf = require('rimraf')
const maxAllowedFileRead = 7

ncp.limit = 6

function sorter (a, b) {
  if (a.isDirectory) {
    if (b.isDirectory) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    } else {
      return -1
    }
  } else {
    if (b.isDirectory) {
      return 1
    } else {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
    }
  }
}

exports.remove = function (path, callback) {
  fs.lstat(path, function (err, stat) {
    if (err) {
      return callback(err)
    }

    function cb (err) {
      callback(err, err ? null : new FileSystemObject(path, stat))
    }

    if (stat.isDirectory()) {
      rimraf(path, cb)
    } else {
      fs.unlink(path, cb)
    }
  })
}

exports.rename = function (oldPath, newPath, callback) {
  fs.exists(newPath, function (exists) {
    if (exists) {
      return callback(new Error('File already exists'))
    }

    fs.lstat(oldPath, function (err, stat) {
      if (err) {
        return callback(err)
      }

      fs.rename(oldPath, newPath, function (err) {
        callback(err, err
          ? null
          : [
            new FileSystemObject(oldPath, stat),
            new FileSystemObject(newPath, stat)
          ])
      })
    })
  })
}

exports.copy = function (source, destination, callback) {
  fs.exists(destination, function (exists) {
    if (exists || (source === destination)) {
      // add random str to destination
      var ext = p.extname(destination)
      destination = p.join(p.dirname(destination), p.basename(destination, ext) + '_' + common.rndstr() + ext)
    }

    fs.lstat(source, function (err, stat) {
      if (err) {
        return callback(err)
      }

      ncp(source, destination, {
        clobber: false
      }, function (err) {
        callback(err, err ? null : new FileSystemObject(destination, stat))
      })
    })
  })
}

exports.writeFile = function (path, contents, callback) {
  fs.writeFile(path, contents, 'utf8', function (err) {
    if (err) {
      return callback(err)
    }

    fs.lstat(path, function (err, stat) {
      callback(err, err ? null : new FileSystemObject(path, stat))
    })
  })
}

exports.readFile = function (path, callback) {
  fs.lstat(path, function (err, stat) {
    if (err) {
      return callback(err)
    }

    var fileSizeInMegabytes = stat.size / 1e6
    if (fileSizeInMegabytes > maxAllowedFileRead) {
      return callback(new Error('File size limit ' + maxAllowedFileRead + 'MB'))
    }

    fs.readFile(path, function (err, buffer) {
      if (err) {
        return callback(err)
      }

      var contents = isUtf8(buffer) ? buffer.toString('utf8') : buffer

      callback(null, common.extend(new FileSystemObject(path, stat), {
        contents: contents
      }))
    })
  })
}

exports.readDir = function (dir, callback) {
  var results = []
  fs.readdir(dir, function (err, list) {
    if (err) {
      return callback(err)
    }

    var pending = list.length

    if (!pending) {
      return callback(null, results)
    }

    list.forEach(function (file) {
      file = path.resolve(dir, file)
      fs.lstat(file, function (err, stat) {
        if (err) {
          return callback(err)
        }

        results.push(new FileSystemObject(file, stat))

        if (!--pending) {
          callback(null, results.sort(sorter))
        }
      })
    })
  })
}

exports.mkdir = function (path, callback) {
  fs.mkdir(path, '755', function (err) {
    if (err) {
      return callback(err)
    }

    fs.lstat(path, function (err, stat) {
      callback(err, err ? null : new FileSystemObject(path, stat))
    })
  })
}

exports.stat = function (path, callback) {
  fs.lstat(path, function (err, stat) {
    callback(err, err ? null : new FileSystemObject(path, stat))
  })
}
