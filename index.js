var toolbarButtons = document.querySelectorAll('#toolbar a')
for (var i = 0; i < toolbarButtons.length; i++) {
  toolbarButtons[i].addEventListener('click', function (e) {
    var command = this.dataset.command
    if (command === 'h1' || command === 'h2' || command === 'p') {
      document.execCommand('formatBlock', false, command)
    }
    if (command === 'createlink' || command === 'insertimage') {
      var url = window.prompt('Enter the link here: ', 'http:\/\/')
      if (url.length > 7) {
        document.execCommand(this.dataset.command, false, url)
      }
    } else document.execCommand(this.dataset.command, false, null)
  })
}
