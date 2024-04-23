self.onmessage = function (event) {
  let time
  if (performance.now) {
    time = performance.now()
  } else {
    time = Date.now()
  }

  self.postMessage({ action: event.data.action, time: time })
}
