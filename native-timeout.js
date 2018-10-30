let lastTimeoutId = 0
let nextTimeouts = []

function setTimeout(func, delay) {
  const time = Date.now() + delay
  let id = ++lastTimeoutId
  let timeoutObject = { func, time, id }
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

function clearTimeout(id) {
  for(let i = 0; i < nextTimeouts.length; i++) {
    if(nextTimeouts[i].id == id) { // erase element from array
      nextTimeouts = nextTimeouts
          .slice(0, i)
          .concat(nextTimeouts.slice(i+1))
      break;
    }
  }
}

function nextTick() {
  const now = Date.now();
  let i;
  for(i = 0; i < nextTimeouts.length; i++) {
    if(nextTimeouts[i].time > now) break;
    try {
      nextTimeouts[i].func() /// TODO: global object as this?
    } catch(e) {
      console.error(e)
    }
  }
  nextTimeouts = nextTimeouts.slice(i) // remove timeouts
}

export { setTimeout, clearTimeout, nextTick }
