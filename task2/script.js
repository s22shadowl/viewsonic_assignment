let startTime, endTime
const worker = new Worker("worker.js")

worker.onmessage = function (e) {
  if (e.data.action === "start") {
    startTime = e.data.time
  } else if (e.data.action === "end") {
    endTime = e.data.time
    const formatTimeElapsed = (endTime - startTime) / 1000

    startTime = undefined
    endTime = undefined

    document.querySelector(".time-elapsed").textContent =
      "Time-elapsed: " + formatTimeElapsed + " s"
  }
}

const onBeginClick = () => {
  worker.postMessage({ action: "start" })
}

const onEndClick = () => {
  worker.postMessage({ action: "end" })
}
