function resizeContainer() {
  const container = document.querySelector(".container")
  container.classList.toggle("wide")
}

function toggleEditable() {
  const inputElement = document.querySelector(".input")
  if (inputElement.contentEditable === "true") {
    inputElement.contentEditable = false
  } else {
    inputElement.contentEditable = true
  }
}
