const closeButton = document.querySelector('.close-button')

closeButton.addEventListener('click', (event) => {
  const father = event.target.parentElement.parentElement
  father.remove()
})