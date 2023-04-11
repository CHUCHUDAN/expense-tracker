const allAlert = document.querySelector('.all-alert-message')
allAlert.addEventListener('click', (event) => {
  const target = event.target
  if (target.tagName === 'BUTTON') {
    const father = target.parentElement.parentElement
    father.remove()
  }
})