let startTime, endTime
let worker
let isWorkerAvailable = typeof Worker !== "undefined"

const textArea = document.querySelector(".time-elapsed")

try {
  worker = new Worker("worker.js")

  worker.onerror = function (event) {
    console.error("error: ", event)
    isWorkerAvailable = false
  }

  if (isWorkerAvailable) {
    worker.onmessage = function (e) {
      if (e.data.action === "timing start") {
        startTime = e.data.time
      } else if (e.data.action === "timing end") {
        endTime = e.data.time
        const formatTimeElapsed = (endTime - startTime) / 1000

        startTime = undefined
        endTime = undefined

        textArea.textContent = "Time elapsed: " + formatTimeElapsed + " s"
      }
    }
  }
} catch (error) {
  console.log("error", error)
  isWorkerAvailable = false
}

const onBeginClick = () => {
  if (isWorkerAvailable) {
    worker.postMessage({ action: "timing start" })
  } else {
    if (performance.now) {
      startTime = performance.now()
    } else {
      startTime = Date.now()
    }
  }

  textArea.textContent = "Time elapsed: timing..."
}

const onEndClick = () => {
  if (isWorkerAvailable) {
    worker.postMessage({ action: "timing end" })
  } else {
    if (performance.now) {
      endTime = performance.now()
    } else {
      endTime = Date.now()
    }

    const formatTimeElapsed = (endTime - startTime) / 1000

    startTime = undefined
    endTime = undefined

    textArea.textContent = "Time elapsed: " + formatTimeElapsed + " s"
  }
}
