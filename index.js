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
      if (url.length > 7) {
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
  var innerHTML = editor.innerHTML
  window.localStorage.setItem('editor-text', innerHTML)
}

var loadFromStorage = function () {
  var innerHTML = window.localStorage.getItem('editor-text')
  if (innerHTML) {
    editor.innerHTML = innerHTML
  }
}

var deleteStorage = function () {
  var respose = window.confirm('Are you sure you want to delete the whole document?')
  if (respose) {
    window.localStorage.removeItem('editor-text')
    editor.innerHTML = ''
  }
}

loadFromStorage()
