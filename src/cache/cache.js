class Cache {
  constructor (options) {
    this.memorycache = new Map()
    this.hits = 0
    this.misses = 0
  }

  get (key) {
    const hit = this.memorycache.get(key)
    if (hit)
      this.hits++
    else
      this.misses++

    return hit
  }

  set (key, value) {
    try {
      this.memorycache.set(key, value)
        return true
    } catch (e) {
      console.log(e)
        return e
    }
  }

  has (key) {
    return this.memorycache.has(key)
  }

  clear () {
    try {
      this.memorycache.clear()
        return true
    } catch (e) {
      console.log(e)
        return e
    }
  }

  del (key) {
    return this.memorycache.delete(key)
  }

  size () {
    return this.memorycache.size
  }

  hits () {
    return this.hits
  }

  misses () {
    return this.misses
  }

  getElementsFromIterator (it) {
    let element = it.next().value
    let result = []
    while (element !== null && element !== undefined) {
      result.push(element)
      element = it.next().value
    }
    return result
  }

  keys () {
    return this.getElementsFromIterator(this.memorycache.keys())
  }

  values () {
    return this.getElementsFromIterator(this.memorycache.values())
  }
}

module.exports = Cache
