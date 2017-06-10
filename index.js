var colorPalette = ['000000', 'FF9966', '6699FF', '99FF66', 'CC0000', '00CC00', '0000CC', '333333', '0066FF', 'FFFFFF']
var forePalette = document.querySelector('.fore-palette')
var backPalette = document.querySelector('.back-palette')

for (var i = 0; i < colorPalette.length; i++) {
  var forePaletteNode = document.createElement('a')
  forePaletteNode.dataset.command = 'forecolor'
  forePaletteNode.dataset.value = `#${colorPalette[i]}`
  forePaletteNode.style.backgroundColor = `#${colorPalette[i]}`
  forePaletteNode.className = 'palette-item'
  var backPaletteNode = document.createElement('a')
  backPaletteNode.dataset.command = 'backcolor'
  backPaletteNode.dataset.value = `#${colorPalette[i]}`
  backPaletteNode.style.backgroundColor = `#${colorPalette[i]}`
  backPaletteNode.className = 'palette-item'
  forePalette.appendChild(forePaletteNode)
  backPalette.appendChild(backPaletteNode)
}

var toolbarButtons = document.querySelectorAll('#toolbar a')
for (var i = 0; i < toolbarButtons.length; i++) {
  toolbarButtons[i].addEventListener('click', function (e) {
    var command = this.dataset.command
    if (command === 'h1' || command === 'h2' || command === 'p') {
      document.execCommand('formatBlock', false, command)
    }
    if (command === 'forecolor' || command === 'backcolor') {
      document.execCommand(command, false, this.dataset.value)
    }
    if (command === 'createlink' || command === 'insertimage') {
      var url = window.prompt('Enter the link here: ', 'http:\/\/')
      if (url.length > 7) {
        document.execCommand(this.dataset.command, false, url)
      }
    } else document.execCommand(this.dataset.command, false, null)
  })
}
