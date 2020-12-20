const config = require('./config')
const schema = require('./schema')
const plugin = require('./plugin')

module.exports = {
  id: 'trello',
  name: 'Trello',
  description: 'A way to interact with the trello api',
  plugin,
  schema,
  config
}
