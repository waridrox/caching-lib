# caching-library

Implementation of cache managed via eviction policies like FIFO, LRU and LIFO.

* **FIFO**: First In First Out, the first value in the cache is replaced.
* **LRU**: Last Recently Used, the last recently used value cached is replaced.
* **LIFO**: Last In First Out, the last value in the cache is replaced.

## Usage

```js
const Caches = require('caches')

//To create a cache using a specific eviction policy
const lru = new Caches.lru()
const lifo = new Caches.lifo()
const fifo = new Caches.fifo()

```

## Functions

```js

//Methods
get (key) //Get the value from the cache with the specific key
set (key, value) //Sets the key and the value pair in the cache if it doesn't exist
has (key) //checks if the value for the given key exists in the cache
clear() //clears the cache 
del(key) //delete the value for the given key
size() //get the size of the cache
keys() //get all the keys that exist in the cache
values() //get all the values that exist in the cache

```

## For Running Tests
```bash
npm test
```