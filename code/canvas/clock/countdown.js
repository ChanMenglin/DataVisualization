var WINDOW_WIDHT = 1024
var WINDOW_HEIGHT = 768
var MARGIN_TOP = 60
var MARGIN_LEFT = 30
var RADIUS = 8

var countSeconds = 0
var balls = []
var colors = [ '#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#99cc00', '#669900', '#ffbb33', '#ff8800', '#ff4444', '#cc0000']

window.onload = function () {
    WINDOW_WIDHT = document.body.clientWidth || 1024
    WINDOW_HEIGHT = document.body.clientHeight > 1024 ? document.body.clientHeight : 1024
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5) || 60
    MARGIN_LEFT = Math.round(WINDOW_WIDHT / 10) || 30
    RADIUS = Math.round(WINDOW_WIDHT * 4 / 5 / 108) - 1

    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d')

    canvas.width = WINDOW_WIDHT
    canvas.height = WINDOW_HEIGHT

    countSeconds = getCountSeconds()

    setInterval(() => {
        render( context )
        update()
    }, 55);

}

function getCountSeconds () {
    var date = new Date()
    var res = date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
    return res
}

function update () {
    var nextShowSeconds = getCountSeconds()
    if (nextShowSeconds != countSeconds) {
        var countDate = getDate(countSeconds)
        var nextDate = getDate(nextShowSeconds)

        if (parseInt(countDate.hours/10) != parseInt(nextDate.hours/10)) {
            addBall( MARGIN_LEFT, MARGIN_TOP, parseInt(countDate.hours/10))
        }
        if (parseInt(countDate.hours%10) != parseInt(nextDate.hours%10)) {
            addBall( MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(countDate.hours%10))
        }

        if (parseInt(countDate.minutes/10) != parseInt(nextDate.minutes/10)) {
            addBall( MARGIN_LEFT + (15*2+9)*(RADIUS+1), MARGIN_TOP, parseInt(countDate.minutes/10))
        }
        if (parseInt(countDate.minutes%10) != parseInt(nextDate.minutes%10)) {
            addBall( MARGIN_LEFT + (15*3+9)*(RADIUS+1), MARGIN_TOP, parseInt(countDate.minutes%10))
        }

        if (parseInt(countDate.seconds/10) != parseInt(nextDate.seconds/10)) {
            addBall( MARGIN_LEFT + (15*4+9*2)*(RADIUS+1), MARGIN_TOP, parseInt(countDate.seconds/10))
        }
        if (parseInt(countDate.seconds%10) != parseInt(nextDate.seconds%10)) {
            addBall( MARGIN_LEFT + (15*5+9*2)*(RADIUS+1), MARGIN_TOP, parseInt(countDate.seconds%10))
        }

        countSeconds = nextShowSeconds
    }
    updateBalls()
}

function getDate(date) {
    var hours = parseInt(date/3600)
    var minutes = parseInt((date - hours*3600)/60)
    var seconds = date%60
    return {
        hours,
        minutes,
        seconds,
    }
}

function render( ctx ) {
    ctx.clearRect(0, 0, WINDOW_WIDHT, WINDOW_HEIGHT)

    var data = getDate(countSeconds)

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(data.hours/10), ctx)
    renderDigit(MARGIN_LEFT + 15*(RADIUS+1), MARGIN_TOP, parseInt(data.hours%10), ctx)
    renderDigit(MARGIN_LEFT + 15*2*(RADIUS+1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + (15*2+9)*(RADIUS+1), MARGIN_TOP, parseInt(data.minutes/10), ctx)
    renderDigit(MARGIN_LEFT + (15*3+9)*(RADIUS+1), MARGIN_TOP, parseInt(data.minutes%10), ctx)
    renderDigit(MARGIN_LEFT + (15*4+9)*(RADIUS+1), MARGIN_TOP, 10, ctx)
    renderDigit(MARGIN_LEFT + (15*4+9*2)*(RADIUS+1), MARGIN_TOP, parseInt(data.seconds/10), ctx)
    renderDigit(MARGIN_LEFT + (15*5+9*2)*(RADIUS+1), MARGIN_TOP, parseInt(data.seconds%10), ctx)

    ctx.font = 'bold 40px Arial'
    ctx.fillStyle = '#058'
    ctx.fillText('Hello World!', MARGIN_LEFT, MARGIN_TOP + 40*(RADIUS+1))

    ctx.lineWidth = 1
    ctx.strokeStyle = '#058'
    ctx.strokeText('I can show string in canvas', MARGIN_LEFT,  MARGIN_TOP + 40*(RADIUS+1) + 50)

    ctx.fillText('It is toooooooooooooooo long!', MARGIN_LEFT, MARGIN_TOP + 40*(RADIUS+1) + 100, 550)

    for (var i = 0; i < balls.length; i++) {
        drawBall(ctx, balls[i].x, balls[i].y, balls[i].color)
    }
}

function renderDigit( x, y, num, ctx ) {
    for (var i = 0; i < digit[num].length; i++ ) {
        for (var j = 0; j < digit[num][i].length; j++ ) {
            if (digit[num][i][j] == 1) {
                drawBall(ctx, x + j*2*(RADIUS+1) + (RADIUS+1), y + i*2*(RADIUS+1) + (RADIUS+1))
            }
        }
    }
}

function drawBall(ctx, x, y, color = "rgb(0, 102, 153)") {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, RADIUS, 0, 2*Math.PI)
    ctx.closePath()

    ctx.fill()
}

function addBall ( x, y, num ) {
    for (var i = 0; i < digit[num].length; i++ ) {
        for (var j = 0; j < digit[num][i].length; j++ ) {
            if (digit[num][i][j] == 1) {
                var ball = {
                    x: x + j*2*(RADIUS+1) + (RADIUS+1),
                    y: y + i*2*(RADIUS+1) + (RADIUS+1),
                    a: 1.5+Math.random(),// 1.5-2.5
                    vx: Math.pow(-1, Math.ceil( Math.random()*1000)) * 5,
                    vy: -5,
                    color: colors[ Math.floor(Math.random()*colors.length) ],
                }
                balls.push(ball)
            }
        }
    }
}

function updateBalls () {
    var cnt = 0
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx
        balls[i].y += balls[i].vy
        balls[i].vy += balls[i].a

        if (balls[i].y >= WINDOW_HEIGHT ) {
            balls[i].y = WINDOW_HEIGHT
            balls[i].vy = -balls[i].vy*0.75
        }

        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDHT) {
            balls[cnt++] = balls[i]
        }
    }

    balls.splice(cnt)
}
