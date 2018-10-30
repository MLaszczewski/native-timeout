import {
  nextTick,
  setTimeout as setNativeTimeout,
  clearTimeout as clearNativeTimeout,
  setInterval as setNativeInterval,
  clearInterval as clearNativeInterval
} from "./native-timeout.js";

setInterval(() => {
  nextTick()
  console.log("native tick")
}, 100) /// 100ms native listener!

console.log("Scheduling 4 timeouts - in 100, 500, 1000 and 2000ms")

setNativeTimeout(() => console.log("100ms!"), 100)
setNativeTimeout(() => console.log("500ms!"), 500)
let lastOne = setNativeTimeout(() => console.log("2000ms!"), 2000)

setNativeTimeout(() => {

  console.log("1000ms!")
  console.log("Clearing last timeout")
  clearNativeTimeout(lastOne)

  console.log("Scheduling interval every 500ms")
  let interval = setNativeInterval(() => console.log("500ms interval!"), 500)

  console.log("Scheduling interval end in 2300ms")
  setNativeTimeout(() => {
    console.log("Clearing interval")
    clearNativeInterval(interval)
  }, 2300)

}, 1000)
