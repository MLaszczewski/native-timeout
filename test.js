import {
  nextTick,
  setTimeout as setNativeTimeout,
  clearTimeout as clearNativeTimeout } from "./native-timeout.js";

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
}, 1000)
