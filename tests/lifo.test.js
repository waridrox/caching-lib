const Cache = require('../caches').lifo
const assert = require('assert')

describe('Tests for FIFO eviction policy', () => {
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
    
    //since max size is 1, the first value should be removed
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
  it('Should delete the 1st element from cache_size of 2', () => {
    let cache = new Cache({maxSize: 2})

    cache.set('agent', 47)
    cache.set('agent2', 48)
    cache.set('agent3', 49)

    const cacheVal1 = cache.get('agent')
    const cacheVal2 = cache.get('agent2')
    const cacheVal3 = cache.get('agent3')

    //the first element to be set will be removed from the cache as more elements come into existence
    assert.deepEqual(cacheVal1, 47)
    assert.deepEqual(cacheVal2, undefined)
    assert.deepEqual(cacheVal3, 49)
    assert.deepEqual(cache.size(), 2)
  })
})
