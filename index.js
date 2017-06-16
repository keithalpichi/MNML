var toolbarButtons = document.querySelectorAll('#toolbar a')
var editor = document.querySelector('#editor')
var titleInput = document.querySelector('#title')

for (var i = 0; i < toolbarButtons.length; i++) {
  toolbarButtons[i].addEventListener('click', function (e) {
    var command = this.dataset.command
    if (command === 'h1' || command === 'h2' || command === 'p') {
      document.execCommand('formatBlock', false, command)
    } else if (command === 'createlink' || command === 'insertimage') {
      var url = window.prompt('Enter the link here: ', 'http:\/\/')
      if (url && url.length > 7) {
        document.execCommand(this.dataset.command, false, url)
      }
    } else if (command === 'save') {
      saveToStorage()
    } else if (command === 'delete') {
      deleteStorage()
    } else {
      document.execCommand(this.dataset.command, false, null)
    }
    editor.focus()
  })
}

editor.addEventListener('keydown', function (e) {
  if (e.key === 'Tab') {
    // document.execCommand('indent', false, null)
    e.preventDefault()
  }
})

titleInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    editor.focus()
  }
})

var saveToStorage = function () {
  var editorInnerHTML = editor.innerHTML
  var titleText = titleInput.value
  window.localStorage.setItem('mnml-text', editorInnerHTML)
  window.localStorage.setItem('mnml-title', titleText)
}

var loadFromStorage = function () {
  var innerHTML = window.localStorage.getItem('mnml-text')
  var titleText = window.localStorage.getItem('mnml-title')
  if (innerHTML) {
    editor.innerHTML = innerHTML
  }
  if (titleText) {
    titleInput.value = titleText
  }
}

var deleteStorage = function () {
  var respose = window.confirm('Are you sure you want to delete the whole document?')
  if (respose) {
    window.localStorage.removeItem('mnml-text')
    window.localStorage.removeItem('mnml-title')
    editor.innerHTML = ''
    titleInput.value = ''
  }
}

loadFromStorage()
