// Nes websocket service
function VsdFsService (client, options) {
  options = options || {}
  const mount = options.mount || ''

  function stat (path) {
    return client.request({
      path: mount + '/stat?path=' + path,
      method: 'GET'
    })
  }

  function readDir (path) {
    return client.request({
      path: mount + '/readdir?path=' + path,
      method: 'GET'
    })
  }

  function readFile (path) {
    return client.request({
      path: mount + '/readfile?path=' + path,
      method: 'GET'
    })
  }

  function writeFile (path, contents) {
    return client.request({
      path: mount + '/writefile',
      payload: {
        path: path,
        contents: contents
      },
      method: 'PUT'
    })
  }

  function mkdir (path) {
    return client.request({
      path: mount + '/mkdir',
      payload: {
        path: path
      },
      method: 'POST'
    })
  }

  function mkfile (path) {
    return client.request({ path: mount + '/mkfile',
      payload: {
        path: path
      },
      method: 'POST'
    })
  }

  function copy (source, destination) {
    return client.request({
      path: mount + '/copy',
      payload: {
        source: source,
        destination: destination
      },
      method: 'POST'
    })
  }

  function rename (oldPath, newPath) {
    return client.request({
      path: mount + '/rename',
      payload: {
        oldPath: oldPath,
        newPath: newPath
      },
      method: 'PUT'
    })
  }

  function remove (path) {
    return client.request({
      path: mount + '/remove',
      payload: {
        path: path
      },
      method: 'DELETE'
    })
  }

  this.stat = stat
  this.mkdir = mkdir
  this.mkfile = mkfile
  this.copy = copy
  this.readFile = readFile
  this.readDir = readDir
  this.writeFile = writeFile
  this.rename = rename
  this.remove = remove
}

module.exports = VsdFsService
