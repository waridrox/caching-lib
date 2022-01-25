const fifo = require('./src/eviction-policies/fifo.js')
const lifo = require('./src/eviction-policies/lifo.js')
const lru = require('./src/eviction-policies/lru.js')

module.exports = {
  fifo,
  lru,
  lifo,
}
