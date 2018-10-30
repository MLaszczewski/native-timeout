let lastTimeoutId = 0
let nextTimeouts = []

function setNativeTimeout(func, delay, ...params) {
  const time = Date.now() + delay
  let id = ++lastTimeoutId
  let timeoutObject = { func: () => func(...params), time, id }
  if(nextTimeouts.length == 0) {
    nextTimeouts = [timeoutObject]
    return id;
  }
  for(let i = 0; i < nextTimeouts.length; i++) {
    if(nextTimeouts[i].time > time) { // Insert timeout to array
      nextTimeouts = nextTimeouts
          .slice(0, i)
          .concat([timeoutObject] )
          .concat(nextTimeouts.slice(i))
      return id;
    }
  }
  nextTimeouts.push(timeoutObject)
  return id;
}

function clearNativeTimeout(id) {
  for(let i = 0; i < nextTimeouts.length; i++) {
    if(nextTimeouts[i].id == id) { // erase element from array
      nextTimeouts = nextTimeouts
          .slice(0, i)
          .concat(nextTimeouts.slice(i+1))
      break;
    }
  }
}

let lastIntervalId = 0
let intervals = new Set()

function setNativeInterval(func, delay, ...params) {
  let id = ++lastIntervalId
  intervals.add(id)
  const intervalFunc = () => {
    if(!intervals.has(id)) {
      return;
    }
    try {
      func(...params)
    } catch(e) {
      console.error(e)
    }
    setNativeTimeout(intervalFunc, delay)
  }
  setNativeTimeout(intervalFunc, delay)
  return id
}

function clearNativeInterval(id) {
  intervals.delete(id)
}

function nextTick() {
  const now = Date.now();
  let i;
  for(i = 0; i < nextTimeouts.length; i++) {
    if(nextTimeouts[i].time > now) break;
  }
  const timeoutsNow = nextTimeouts.slice(0, i)
  nextTimeouts = nextTimeouts.slice(i) // remove timeouts

  /// run timeout functions
  for(let timeout of timeoutsNow) {
    try {
      timeout.func() /// TODO: global object as this?
    } catch(e) {
      console.error(e)
    }
  }
}

export { setNativeTimeout, clearNativeTimeout, setNativeInterval, clearNativeInterval, nextTick }
