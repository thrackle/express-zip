module.exports = {
  create: create
}

function create(version) {
  return require('./' + version)()
}
