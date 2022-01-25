const LIFOQueue = require('../data-structure/doubly-linked-list')
const CacheObject = require('../cache/cache')

module.exports = class LIFOPolicy extends CacheObject {
  constructor (options = {maxSize: 1000}) {
    super(options)
    this.keys = new LIFOQueue()
    this.max = options.maxSize
  }

  set (key, value) {
    const max = this.max
    const size = this.keys.length
    if (size >= max) {
      this.del(this.keys.pop())
    }
    if (!this.keys.has(key)) {
      this.keys.push(key)
    }
    const res = super.set(key, value)
    return res
  }

  clear () {
    this.keys.clear()
    return super.clear()
  }

  del (key) {
    const del = super.del(key)
    del && this.keys.delete(key)
    return del
  }
}
