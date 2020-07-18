var canvasWidth = Math.min(800, $(window).width() - 20)
var canvasHeight = canvasWidth

var strokeColor = window.matchMedia('(prefers-color-scheme: dark)') ? 'wheat' :'black'
var isMouseDown = false
var lastLocation = {x: 0, y: 0}
var lastTimeStamp = 0
var lastLineWidth = -1

var maxLineWidth = 30
var minLinWidth = 1
var maxStrokeV = 10
var minStrokeV = 0.1

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

canvas.width = canvasWidth
canvas.height = canvasHeight

window.onload = function () {
  $('#contraller').css('width', canvasWidth + "px")

  drawGrd() // 绘制米字格

  $('.color_btn').click(
    function (e) {
      $('.color_btn').removeClass('color_btn_selected')
      $(this).addClass('color_btn_selected')
      strokeColor = $(this).css('background-color')
    }
  )

  window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) {
    if (['wheat', 'black'].includes(strokeColor)) strokeColor = e.matches ? 'wheat' :'black'
  })

  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault()
    beginStroke({x: e.touches[0].pageX, y: e.touches[0].pageY })
  })

  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault()
    strokeMove({x: e.touches[0].pageX, y: e.touches[0].pageY })
  })

  canvas.addEventListener('touchend', function(e) {
    e.preventDefault()
    endStroke()
  })

  canvas.onmousedown = function (e) {
    e.preventDefault()
    beginStroke({x: e.clientX, y: e.clientY})
  }

  canvas.onmouseup = function (e) {
    e.preventDefault()
    endStroke()
  }

  canvas.onmousemove = function (e) {
    e.preventDefault()
    strokeMove({x: e.clientX, y: e.clientY})
  }

  canvas.onmouseout = function (e) {
    e.preventDefault()
    endStroke()
  }

  document.getElementById('clear_btn').onclick = function(e) {
    e.preventDefault()

    context.clearRect(0, 0, canvasWidth, canvasHeight)
    drawGrd()
  }
}

function strokeMove(point) {
  if (isMouseDown) {
    var curLocation = windowToCanvas(point.x, point.y)
    var curTimeStamp = new Date().getTime()
    var s = calcDistance(curLocation, lastLocation)
    var t = curTimeStamp - lastTimeStamp
    var curLineWidth = calclineWidth(t, s)
    // draw
    context.beginPath()
    context.moveTo(lastLocation.x, lastLocation.y)
    context.lineTo(curLocation.x, curLocation.y)
    context.closePath()
    context.strokeStyle = strokeColor
    context.lineWidth = curLineWidth
    context.lineCap = "round"
    context.lineJoin = "round"
    context.stroke()
    lastLocation = curLocation
    lastTimeStamp = curTimeStamp
    lastLineWidth = curLineWidth
  }
}

function endStroke() {
  isMouseDown = false
}

function beginStroke(point) {
  isMouseDown = true
  lastLocation = windowToCanvas(point.x, point.y)
  lastTimeStamp = new Date().getTime()
}

/**
 * 根据书写的速度计算绘制线条的粗细
 * @param {time} t 时间差
 * @param {s} s 距离差
 * @returns lineWidth
 */
function calclineWidth(t, s) {
  var v = s / t

  var resultLinWidth = 0
  if (v < minStrokeV) resultLinWidth = maxLineWidth
  else if (v > maxStrokeV) resultLinWidth = minLinWidth
  else resultLinWidth = maxLineWidth - (v - minStrokeV) / (maxStrokeV - minStrokeV) * (maxLineWidth - minLinWidth)
  if (lastLineWidth === -1) {
    return resultLinWidth
  } else {
    return lastLineWidth * 2/3 + resultLinWidth * 1/3
  }

}

/**
 * 两点间的距离
 * @param {Object} loc1 当前鼠标所在位置坐标
 * @param {Object} loc2 上一次鼠标所在坐标
 * @returns 亮点间的距离
 */
function calcDistance(loc1, loc2) {
  return Math.sqrt(Math.pow(loc1.x - loc2.x, 2) + Math.pow(loc1.y - loc2.y, 2))
}

/**
 * 将鼠标点击坐标转换为 canvas 中的坐标
 * @param {Double} x 鼠标点击的 x 坐标
 * @param {Double} y 鼠标点击的 y 坐标
 * @returns canvas 中 x,y 坐标
 */
function windowToCanvas(x, y) {
  var bbox = canvas.getBoundingClientRect()
  return {
    x: Math.round(x - bbox.left),
    y: Math.round(y - bbox.top)
  }
}

/**
 * 绘制米字格
*/
function drawGrd() {
  context.save()

  context.strokeStyle = 'rgb(230, 11, 9)'

  // 绘制正方形边框
  context.beginPath()
  context.moveTo(3, 3)
  context.lineTo(canvasHeight - 3, 3)
  context.lineTo(canvasHeight - 3, canvasWidth - 3)
  context.lineTo(3, canvasWidth - 3)
  context.closePath()
  context.lineWidth = 6
  context.stroke()

  // 绘制米字格的四条线
  context.beginPath()

  context.moveTo(0, 0)
  context.lineTo(canvasWidth, canvasHeight)

  context.moveTo(canvasWidth, 0)
  context.lineTo(0, canvasHeight)

  context.moveTo(canvasWidth/2, 0)
  context.lineTo(canvasWidth/2, canvasHeight)

  context.moveTo(0, canvasHeight/2)
  context.lineTo(canvasWidth, canvasHeight/2)

  context.lineWidth = 1
  context.stroke()

  context.closePath()

  context.restore()
}


