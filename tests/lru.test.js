const Cache = require('../caches').lru
const assert = require('assert')

describe('Tests for LRU eviction policy', () => {
  it('Check for undefined element in the cache', () => {
    let cache = new Cache()
    const A = cache.get('a')
    assert.deepEqual(A, undefined)
  })

  it('Checking truth status after addition of an element', () => {
    let cache = new Cache()
    let setValue = cache.set('agent', 47)

    assert.deepEqual(setValue, true)
  })

  it('Should return corresponding value of key over existing element', () => {
    let cache = new Cache()

    const insertIntoCache = cache.set('agent', 47)
    assert.deepEqual(insertIntoCache, true)
    const checkCacheVal = cache.get('agent')
    assert.deepEqual(checkCacheVal, 47)
  })

  it('Setting the second element with cache_size 1', () => {
    let cache = new Cache({maxSize: 1})

    cache.set('agent', 47)
    cache.set('bond', 7)

    const cacheVal1 = cache.get('agent')
    const cacheVal2 = cache.get('bond')

    assert.deepEqual(cacheVal1, undefined)
    assert.deepEqual(cacheVal2, 7)
    assert.deepEqual(cache.size(), 1)
  })

  it('Should update the value of the key instead of removing it from the cache', () => {
    let cache = new Cache({maxSize: 1})
    cache.set('agent', 47)
    cache.set('agent', 48)

    const cacheVal = cache.get('agent')

    assert.deepEqual(cacheVal, 48)
    assert.deepEqual(cache.size(), 1)
  })

  it('Should delete the Least Recently Used element from cache_size of 2', () => {
    let cache = new Cache({maxSize: 2})

    cache.set('agent', 47)
    cache.set('agent2', 48)

    cache.get('agent')

    cache.set('agent3', 49)

    const cacheVal1 = cache.get('agent2')

    assert.deepEqual(cacheVal1, undefined)
    assert.deepEqual(cache.size(), 2)
  })

  it('Should not increase frequency count with the `has` method', () => {
    let cache = new Cache({maxSize: 2})
    cache.set('agent', 47)
    cache.set('agent2', 48)
    const r2 = cache.has('agent')
    cache.set('agent3', 49)
    const r4 = cache.get('agent')
    assert.deepEqual(r2, true)
    assert.deepEqual(r4, undefined)
    assert.deepEqual(cache.size(), 2)
  })

  it('Should remove the LRU element from the cache of cache_size 3', () => {
    let cache = new Cache({maxSize: 3})
    
    cache.set('agent', 47)
    assert.deepEqual(cache.keys.last(), 'agent')

    const cacheVal1 = cache.set('james', 71)
    assert.deepEqual(cache.keys.last(), 'james')
    assert.equal(cacheVal1, true)
  
    const cacheVal2 = cache.set('agent', 56)
    assert.deepEqual(cache.keys.last(), 'agent')
    assert.deepEqual(cache.keys.first(), 'james')
    assert.equal(cacheVal2, true)

    const cacheVal3 = cache.set('bond', 7)
    assert.equal(cacheVal3, true)
    assert.deepEqual(cache.keys.last(), 'bond')
    assert.deepEqual(cache.keys.first(), 'james')

    cache.set('ben', "Value for key = ben")

    assert.deepEqual(cache.keys.last(), 'ben')
    assert.deepEqual(cache.keys.first(), 'agent')

    const cacheVal4 = cache.get('agent')
    assert.deepEqual(cacheVal4, 56)

    assert.deepEqual(cache.keys.last(), 'agent')
    assert.deepEqual(cache.keys.first(), 'bond')
    assert.deepEqual(cache.size(), 3)
  })
})
