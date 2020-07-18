var canvasWidth = $(window).width()
var canvasHeight = $(window).height()

var radius = 50
var animation = -1
var leftMargin = 0, topMargin = 0

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var clippingRange = {x: 0, y: 0, r: radius}

canvas.width = canvasWidth
canvas.height = canvasHeight

var image = new Image()
image.src = '001.jpg'

image.onload = function ( ) {
  $('#blur-div').css('width', canvasWidth+'px')
  $('#blur-div').css('height', canvasHeight+'px')

  $('#blur-image').css('width', image.width+'px')
  $('#blur-image').css('height', image.height+'px')

  leftMargin = (image.width - canvasWidth) / 2
  topMargin = (image.height - canvasHeight) / 2

  $('#blur-image').css('top', String(-topMargin) +'px')
  $('#blur-image').css('left', String(-leftMargin) +'px')

  draw(image, clippingRange)
}

function draw( image, clippingRange ) {
  context.clearRect(0, 0, canvasWidth, canvasHeight)

  context.save()
  setClipRange(clippingRange)
  context.drawImage(image,
      Math.max(0, leftMargin), Math.max(0, topMargin),
      Math.min(image.width, canvasWidth), Math.min(image.height, canvasHeight),
      leftMargin < 0 ? -leftMargin : 0, topMargin< 0 ? -topMargin : 0,
      Math.min(image.width, canvasWidth), Math.min(image.height, canvasHeight))
  context.restore()
}

function setClipRange(clippingRange) {
  context.beginPath()
  context.lineWidth = 10
  context.strokeStyle = '#aaa'
  context.arc(clippingRange.x, clippingRange.y, clippingRange.r, 0, Math.PI*2)
  context.stroke()
  context.clip()
}

function show() {
  animation = setInterval(() => {
    clippingRange.r += 20
    if (clippingRange.r > 2*Math.max(canvasHeight, canvasWidth)) clearInterval(animation)
    draw(image, clippingRange)
  }, 30);
}

function reset() {
  clearInterval(animation)
  var theleft = leftMargin < 0 ? -leftMargin : 0
  var theTop = topMargin< 0 ? -topMargin : 0

  clippingRange = {
    x: Math.random()*(canvasWidth - radius*2 - theleft*2) + radius + theleft,
    y: Math.random()*(canvasWidth - radius*2 - theTop*2) + radius + theTop, r: radius
  }
  draw(image, clippingRange)
}

canvas.addEventListener('touchstart', function (e) {
  e.preventDefault()
})
