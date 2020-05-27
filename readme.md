# Canvas

> html5 中的标签 `<canvas></canvas>`

## 目录

* [1.1 基础](#11-基础)
* [2.1 `context`](#21-context)
  * [2.1.1 绘制直线](#211-绘制直线)
  * [2.1.2 绘制简单图形](#212-绘制简单图形)
  * [2.1.3 绘制矩形](#213-绘制矩形)
  * [2.1.4 线条属性](#214-线条属性)
  * [2.1.5 样式属性](#215-样式属性)
    * [2.1.5.1 渐变色填充](#2151-渐变色填充)
  * [2.1.6 图形变换](#216-图形变换)
  * [2.1.7 绘制弧线](#217-绘制弧线)
  * [2.1.8 贝塞尔曲线](#218-贝塞尔曲线)
    * [2.1.8.1 二次贝塞尔曲线](#2181-二次贝塞尔曲线)
    * [2.1.8.2 贝塞尔三次曲线](#2182-贝塞尔三次曲线)
  * [2.1.9 文字渲染](#219-文字渲染)
    * [2.1.9.1 字体绘制](#2191-字体绘制)
    * [2.1.9.2 文字对齐](#2192-文字对齐)
    * [2.1.9.3 文本测量](#2193-文本测量)
* [2.2 Canvas 高级内容](#22-canvas-高级内容)
  * [2.2.1 阴影](#221-阴影)
  * [2.2.2 透明度](#222-透明度)
  * [2.2.3 重叠](#223-重叠)
  * [2.2.4 剪辑区域](#224-剪辑区域)
  * [2.2.5 非0环绕原则](#225-非0环绕原则)
  * [2.2.6 清空](#226-清空)
  * [2.2.7 点击检测](#227-点击检测)
  * [2.2.8 扩充 context](#228-扩充-context)
* [2.3 Canvas 图像处理](#23-canvas-图像处理)
  * [2.3.1 Canvas 图像基础](#231-canvas-图像基础)
  * [2.3.2 离屏 Canvas](#232-离屏-canvas)
  * [2.3.3 Canvas 进行像素级操作](#233-canvas-进行像素级操作)
  * [2.3.4 创建 imageData](#234-canvas-imagedata)


## 1.1 基础

```html
<cnavas width="1024" height="768"></canvas>
```

> 不建议使用 css 的方式设置 canvas 的大小，而是直接使用 `width` `height` 属性

```html
<canvas id="canvas">
    <!-- 处理兼容性问题（方法一）
        只有在不兼容的浏览器上才会显示 canvas 标签内的内容 -->
    您的浏览器不支持 canvas
</canvas>

<script>
    var canvas = document.getElementById("canvas")

    // 也可以使用这种方式设置 canvas 的大小
    canvas.width = 1027
    canvas.heiht = 768

    // 解决兼容性问题（方法二）
    if (canvas.getContext('2d')) {
        // 兼容
    } else {
        // 不兼容
    }

</script>
```

## 2.1 `context`

```js
var context = canvas.getContext("2d")
```

> 原点：canvas 左上角为  
> x 轴正向：水平向右  
> y 轴正向：竖直向下  

### 2.1.1 绘制直线

> `canvas` 中的绘图是状态设置 - 先设置状态，再绘制

```js
// moveTo （将画笔）移动到（x, Y）
context.moveTo(
    X，x 轴
    y, y 轴
)

// lineTo (从上一个点)链接到（x, Y）
context.lineTo(
    X，x 轴
    y, y 轴
)

context.lineWidth // 线条宽度
context.strokeStyle // 绘制样式
context.stroke() // 绘制
```

```js
context.moveTo(100, 100) // 将画笔放到 100，100
context.lineTo(700, 700) // 将画笔移动到 700，700
context.lineWidth = 5 // 设置线条的宽度
context.strokeStyle = "#005588" // 设置线条的颜色

context.stroke() // 绘制线条
```

[画一条直线](code/2.1.1%20画一条直线.html)

### 2.1.2 绘制简单图形

```js
// beginPath
context.beginPath() // 开始
// closePath
// 如果在非封闭图形使用 closePath, 会自动将图形封闭
context.closePath() // 结束
// fill
// 如果在非封闭图形使用 fill, 会自动将图形封闭
context.fillStyle // 填充样式
context.fill() // 填充
```

> `beginPath()` 与 `lineTo(x, y)` 同时使用时，相当于 `moveTo(x, y)`  

> `beginPath` & `closePath` 不总是成对出现

> 一般采用 `beginPath` 和 `closePath` 相结合绘制封闭图形，如果使用 `lineTo` 绘制封闭图形会产生暇疵（在 `lineWidth` 不为 1 时），而使用 `closePath` 就不会有这个问题 [绘制封闭图形](code/2.1.2%20绘制封闭图形.html)

> 在使用 `fillStyle` 同时使用 `strokeStyle` 时，应先使用 `fillStyle` 填充颜色再使用 `strokeStyle` 绘制边框，否则 `fillStyle` 会将一半边框宽度的区域填充 [绘制填充图形](code/2.1.1%20绘制填充图形.html)

绘制出来的线条均为黑色，这是因为 canvans 绘图是基于状态的，靠后的样式会覆盖前面的样式  

```js
context.moveTo(100, 100) // 将画笔放到 100，100
context.lineTo(700, 700) // 将画笔移动到 700，700
context.lineTo(100, 700)
context.lineTo(100, 100)

context.lineWidth = 5 // 设置线条的宽度
context.strokeStyle = "#005588" // 设置线条的颜色（可使用 css 的属性设置）
context.stroke() // 绘制线条

context.fillStyle = 'red' // 填充样式
context.fill() // 填充

context.moveTo(200, 100)
context.lineTo(700, 600)

context.strokeStyle = "black"
context.stroke()
```

使用 `beginPath` 和 `closePath` 就可以解决上面的问题，区分状态

```JS
context.beginPath() // 开始
context.moveTo(100, 100) // 将画笔放到 100，100
context.lineTo(700, 700) // 将画笔移动到 700，700
context.lineTo(100, 700)
context.lineTo(100, 100)
// 当绘制的图形不是一个封闭的图形时使用 closePath 会自动将图形的首尾相连形成一个封闭的图形
context.closePath() // 结束

context.lineWidth = 5 // 设置线条的宽度
context.strokeStyle = "#005588" // 设置线条的颜色（可使用 css 的属性设置）

context.stroke() // 绘制线条

context.beginPath() // 开始
context.moveTo(200, 100)
context.lineTo(700, 600)
context.closePath() // 结束

context.strokeStyle = "black"

context.stroke()
```

[绘制简单图形](code/2.1.2%20绘制简单图形.html)
[绘制七巧板](code/2.1.2%20绘制七巧板.html)

### 2.1.3 绘制矩形

```js
// 规划矩形的路径
context.rect(
  x, // 矩形的顶点横坐标
  y, // 矩形的顶点纵坐标
  width, // 矩形的宽度
  height, // 矩形的高度
)
// 绘制填充矩形（不需要 rect 方法）
context.fillRect(
  x, // 矩形的顶点横坐标
  y, // 矩形的顶点纵坐标
  width, // 矩形的宽度
  height, // 矩形的高度
)
// 绘制矩形边框（不需要 rect 方法）
context.strokeRect(
  x, // 矩形的顶点横坐标
  y, // 矩形的顶点纵坐标
  width, // 矩形的宽度
  height, // 矩形的高度
)
```

```js
// 使用 rect 绘制矩形
context.beginPath()
context.rect(200, 50, 500, 200)
context.closePath()
context.strokeStyle = 'red'
context.stroke()

// 使用 fillRect 绘制矩形
context.fillStyle = 'green'
context.beginPath()
context.fillRect(200, 300, 500, 200)
context.closePath()

// 使用 strokeRect 绘制矩形
context.strokeStyle = 'blue'
context.beginPath()
context.strokeRect(200, 550, 500, 200)
context.closePath()
```

[绘制矩形](code/2.1.3%20绘制矩形.html)

### 2.1.4 线条属性

* `lineWidth` - 线条宽度
* `lineCap` - 线条两端的样式（只能用于线段的开始处和结尾处，不能用于连接处）
  - butt（default）
  - round
  - square
  ![lineCap](img/2.1.4%20lineCap.png)
* lineJoin - 线条相交时的样式
  - miter（default）尖角 - miterLimit: 10（default）限制  miter
  - bevel 斜接
  - round 圆角


### 2.1.5 样式属性

```text
fillStyle:  color - css 颜色表示形式
            grandient - createLinearGradient（线性渐变色）、createLinearGradient（镜像渐变色）
            image - 图片（使用 createPattern）
            canvas - 另一个 canvas（使用 createPattern）
            video - 视频（使用 createPattern）
```

> 以上方式均可用于 `strokeStyle`

#### 2.1.5.1 渐变色填充

**线性渐变**

```js
// 线性渐变
var grd = context.createLinearGradient(
  xStrat,
  yStrat,
  xEnd,
  yEnd,
)
// 关键色
grd.addColorStop(
  stop,
  color,
)
```

```js
var grd = context.createLinearGradient(0, 0, 800, 800)
grd.addColorStop(0.0, '#fff')
grd.addColorStop(1.0, '#000')
context.fillStyle = grd
```

**镜像渐变**

```js
// 镜像渐变
var grd = context.createRadialGradient(
  x0,
  y0,
  r0,
  x1,
  y1,
  r1,
)
// 关键色
grd.addColorStop(
  stop,
  color,
)
```

```js
var grd = context.createRadialGradient(250, 250, 50, 250, 250, 400)
grd.addColorStop(0.0, '#fff')
grd.addColorStop(1, '#003300')
context.fillStyle = grd
```

**图片填充**

```js
// 图片填充
var pattern = context.createPattern(
  image, // 1. javascript image 对象 
        // 2. 另一个 canvas 对象
        // 3. video 对象
  repeat-dtyle: no-repeat // 不重复
                repeat-x // 延 x 轴重复
                repeat-y // 延 y 轴重复
                repeat // 延 x 轴、y 轴重复
)
```

```js
var img = new Image()
img.src = 'imag.png'
img.onload = function() {
  var pattern = context.createPattern(img, 'no-repeat')
}
```

[渐变色填充](code/2.1.6.1%20渐变色填充.html)

### 2.1.6 图形变换

* 位移 translate( x, y ) - 移动原点
* 旋转 rotate( deg )
* 缩放 scale( sx, sy )

> `translate` 是叠加的

```js
context.save() // 保存 canvas 当前的状态
context.restore() // 还原上一次 save 时 canvas 的状态
```

> `save` 和 `restore` 总是成对出现，这样就可以解决 `translate` 叠加的问题

[图形变换](code/2.1.6%20图形变换.html)

* `transform(a, b, c, d, e, f)` 变换矩阵 - `transform(1, 0, 0, 1, 0, 0)` (default) 表示不改变图形  

> `transform` 是会叠加的  
> `setTranform(a, b, c, d, e, f)` 可忽略之前的所有变换

```text
a c e   1 0 0
b d f - 0 1 0 (default)
0 0 1   0 0 1

a, d - 水平、垂直缩放
b, c - 水平、垂直倾斜
e, f - 水平、垂直位移
```

[托章 - 绘制星空](code/2.1.6%20绘制星空.html)

### 2.1.7 绘制弧线

```js
// arc
context.arc(
    centerX, centerY // 圆心的坐标
    radius, // 圆的半径
    startingSngle, endingAngle, // 弧线开始和结束的位置（弧度）
    anticlockwise = false, // 可选，false: 顺时针绘制（默认），true：逆时针绘制
)
```

![`startingSngle` 和 `endingAngle的进一步说明`](img/2.1.7%20arc弧度.png)  
`startingSngle` 和 `endingAngle` 的进一步说明

```js
// 顺时针
context.arc(300, 300, 200, 0, 1.5 * Math.PI)

context.lineWidth = 5
context.strokeStyle="#005588"

context.stroke()

// 逆时针
context.arc(300, 300, 200, 0, 1.5 * Math.PI, true)

context.lineWidth = 5
context.strokeStyle="#005588"

context.stroke()
```

[画圆](code/2.1.7%20画圆.html)  
[绘制圆角矩形](code/2.1.7%20绘制圆角矩形.html)  
[拓展 - 数字时钟](code/clock/clock.html)

```js
// arcTo
context.arc(
    x1, y1 // 第一个圆的圆心（第一个控制点）
    x2, y2, // 第二个圆的圆心（第二个控制点）
    radius, // 圆的半径
)
```

```js
context.beginPath()
context.moveTo(150, 150)
context.arcTo(650, 150, 650, 650, 300)

context.lineWidth = 5
context.storkeStyle = 'red'
context.stroke()
```

[绘制弧线](code/2.1.7%20绘制弧线.html)  
[绘制月亮](code/2.1.7%20绘制月亮.html)

### 2.1.8 贝塞尔曲线

[贝塞尔曲线 - Wikipedia](https://zh.wikipedia.org/wiki/%E8%B2%9D%E8%8C%B2%E6%9B%B2%E7%B7%9A)  
[Bézier curve - Wikipedia](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)  
[深入理解贝塞尔曲线 - 知乎](https://juejin.im/post/5b854e1451882542fe28a53d)

#### 2.1.8.1 二次贝塞尔曲线

> [参考 - Canvas Quadratic Curve Example](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/quadratic-curve.html)

```js
// 二次贝塞尔曲线
context.moveTo(x0, y0) // (x0, y0) 曲线的起始点
context.quadraticCurveTo(
  x1, y1, // (x1, y1) 曲线的控制点
  x2, y2, // (x2, y2) 曲线的终止点
)
```

[使用贝塞尔曲线绘制月亮](code/2.1.8%20使用贝塞尔曲线绘制月亮.html)  

#### 2.1.8.2 贝塞尔三次曲线

> [参考 - Canvas Bézier Curve Example](http://blogs.sitepointstatic.com/examples/tech/canvas-curves/bezier-curve.html)

```js
// 贝塞尔三次曲线
context.moveTo(x0, y0) // (x0, y0) 曲线的起始点
context.bezierCurveTo(
  x1, y1, // (x1, y1) 曲线的控制点
  x2, y2, // (x2, y2) 曲线的控制点
  x3, y3, // (x3, y3) 曲线的终止点
)
```

### 2.1.9 文字渲染

```js
// 文字渲染基础
context.font = 'bold 40px Arial'
context.fillText(string, x, y, [maxLen])

context.font = 'bold 40px Arial'
context.strokeText(string, x, y, [maxLen])
```

```js
context.font = 'bold 40px arial'
context.fillStyle = '#058'
context.fillText('Hello World!', 40, 400)

context.lineWidth = 5
context.strokeStyle = '#058'
context.strokeText('I can show string in canvas', 40, 200)

context.fillText('It is toooooooooooooooo long!', MARGIN_LEFT, MARGIN_TOP + 40*(RADIUS+1) + 100, 550)
```

[拓展 - 数字时钟](code/clock/clock.html)

#### 2.1.9.1 字体绘制

```js
// font - 与 css 中 font 的设置一致
context.font = // 20px sans-serif (default)
  font-style // 字体样式
    - normal  (default)
    - italic  (斜体 - 字体会有专门的斜体字)
    - oblique (倾斜字体 - 将文字倾斜，不会使用字体的斜体字)
  font-variant
    - normal      (default)
    - small-caps  (以小型的大写字母显示小写字母 - 使用英文小写字母时才有作用)
  font-weight // 粗细
    - normal  (debault - 400)
    - bold (粗体 - 700)
    - ligter (细 - 支持不佳)
    - bolder (粗 - 支持不佳)
    - 100 ｜ 200 ｜ 300 ｜ 400 ｜ 500 ｜ 600 ｜ 700 ｜ 800 ｜ 900（支持不佳）
  font-size // 字号
    - 30px | .5em | 150%
    - xx-small | x-small | medium | large | x-large | xx-large
  font-family // 字体
    - 设置多种备选姿
    - #font-face
    - web 安全字体
```

#### 2.1.9.2 文本对齐

```js
// 文本横向对齐 - 与 css 中 text-align 的设置一致
context.textAlign = // left (default)
  - left
  - center
  - right

// 文本纵向对齐
context.textBaseline = // alphabetic (default)
  - top
  - middle
  - bottom
  - alphabetic - 基于拉丁字母的语言
  - ideographic - 基于汉子、日本文字等方块文字
  - hanging - 基于印度语
```

![文本对齐](code/2.1.9.2%20文本对齐.html)

#### 2.1.9.3 文字测量

```js
context.measureText(string).width // 文字在 canva 中所占宽度
// 在使用前应设置好相应的 font 属性，measureText 会根据 font 属性进行计算
```

## 2.2 canvas 高级内容

### 2.2.1 阴影

```js
context.shadowColor // 阴影的颜色（与 fillStyle 用法相同）
// 阴影的位移值
context.shadowOffsetX
context.shadowOffsetY
// 阴影的模糊程度（0 为不模糊，数值越大阅模糊）
context.shadowBlur
```

[剪纸效果](code/2.2.5%20剪纸效果.html)

### 2.2.2 透明度

```js
// 全局透明度
context.globalAlpha = 1 (default)
```

[全局透明度](code/2.2.2%20全局透明度.html)

### 2.2.3 重叠

```js
// 重叠
context.globalCompositeOperation = 
  - 'source-over' (后绘制的图形覆盖之前绘制的图形 default)
  - 'source-atop'
  - 'source-in'
  - 'source-out'
  - 'destination-over' (之前绘制的图形覆盖之后绘制的图形)
  - 'destination-atop'
  - 'destination-in'
  - 'destination-out'
  - 'lighter'
  - 'copy'
  - 'xor'
```

[CanvasRenderingContext2D.globalCompositeOperation - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation)

[2.2.3 重叠](code/2.2.3%20重叠.html)

### 2.2.4 剪辑区域

```js
context.clip()
```

[Image View](code/2.3.2%20imageView.html)

### 2.2.5 非0环绕原则

![非0环绕原则](img/2.2.5%20非0环绕原则.png)
非0环绕原则

[Nonzero-rule - Wikipedia](https://en.wikipedia.org/wiki/Nonzero-rule)

如图，设定一个方向为 正， 一个方向为 负，从一个点引出一条直线，当直线与 正 方向相交记 1，当家头与 负 方向相交记 -1，将所有相交的记录的值求和，当和不为 0 则表示引出该直线的点在图像内部，反之为图像外部。

[剪纸效果](code/2.2.5%20剪纸效果.html)

### 2.2.6 清空

```js
context.clearRect(x, y, width, height) // 对指定区域进行清空操作
```

### 2.2.7 点击检测

```js
context.isPointInPath(x, y) // 点击检测
```

```js
// 获取 canva 中鼠标点击位置
var x = event.clientX - canvas.getBoundingClientRect().left
var y = event.clientY - canvas.getBoundingClientRect().top
```

### 2.2.8 扩充 context

以下两种方式实现的图形相同，第二种方式调用时更简洁也更符合 context 的规范，但不建议直接复写 context 的方法（以下方式为直接复写 context 的 moveTo 方法），而是定义自己的上下文环境

```js
// 方式一
CanvasRenderingContext2D.prototype.fillStar = fucntion (x, y, r, R, rot = 0) {
  this.beginPath()
  for (var i = 0, i < 5; i++) {
    this.linkTo(
      Math.cos( (18 + i*72 - rot)/180 * Math.PI ) * R + x,
      -Math.sin( (18 + i*72 - rot)/180 * Math.PI ) * R + y )
    this.linkTo(
      Math.cos( (54 + i*72 - rot)/180 * Math.PI ) * r + x,
      -Math.sin( (54 + i*72 - rot)/180 * Math.PI ) * r + y )
  }
  this.closePath()

  this.fill()
}

context.fillStar(400, 400, 400, 300)
```

```js
// 方式二
var originalMoveTo = CanvasRenderingContext2D.prototype.moveTo
CanvasRenderingContext2D.prototype.lastMoveToLoc = {}

CanvasRenderingContext2D.prototype.moveTo = function (x, y) {
  orignalMoveTo.apply( context, [x, y] )

  this.lastMoveToLoc.x = x
  this.lastMoveToLoc.y = y
}

CanvasRenderingContext2D.prototype.fillStar = fucntion (r, R, rot = 0) {
  this.beginPath()
  for (var i = 0, i < 5; i++) {
    this.linkTo(
      Math.cos( (18 + i*72 - rot)/180 * Math.PI ) * R + this.lastMoveToLoc.x,
      -Math.sin( (18 + i*72 - rot)/180 * Math.PI ) * R + this.lastMoveToLoc.y )
    this.linkTo(
      Math.cos( (54 + i*72 - rot)/180 * Math.PI ) * r + this.lastMoveToLoc.x,
      -Math.sin( (54 + i*72 - rot)/180 * Math.PI ) * r + this.lastMoveToLoc.y )
  }
  this.closePath()

  this.fill()
}

context.moveTo(400, 400)
context.fillStra(400, 300)
```

## 2.3 canvas 图像处理

### 2.3.1 canvas 图像基础

```js
// 第一种方式
context.drawImage(
  image, // javascript image 对象 或者 canva 对象
  dx, dy, // 图像凯斯的坐标
  dw, dh // 绘制图像的宽和高
)
```

> 如果只传入三个参数（image, dx, dy）canvas 不会对图像进行缩放处理，超出 canvas 画布部分会被裁剪  
> 如果传入绘制的尺寸（dw, dh）canvas 会对图像进行缩放

```js
var image = new Image()
image.src = 'img/001.jpg'
image.onload = function () {
  // 必须在 image 的 onload 中调用 drawImage
  context.drawImage( img, 0, 0 )
}
```

[canvas图像基础](code/2.3.1%20canvas图像基础.html)  
[任意缩放图像](code/2.3.1%20任意缩放图像.html)

```js
// 第二种方式
context.drawImage(
  image, // javascript Image 对象 或者 canva 对象
  sx, sy, sw, sh, // 取愿图像的范围（一部分）
  dx, dy, dw, dh // 绘制到 canvas 画布的范围（显示取到的图像的 canva 画布的指定区域）
)
```

![drawImage 第二种用法](img/2.3.1%20drawImage.png)
context.drawImage(
  image, sx, sy, sw, sh, dx, dy, dw, dh
)

[Canvas 图像基础](code/2.3.1%20canvas图像基础.html)

### 2.3.2 离屏 canvas

[给图像加水印](code/2.3.2%20给图像加水印.html)  
[Image View](code/2.3.2%20imageView.html)

### 2.3.3 canvas 进行像素级操作

```js
// 获取 image 的像素信息
imageData = context.imageData(x, y, width, height)

imageData 对象
  - width
  - height
  - data // 图像的像素信息
```

![imageData.data](img/2.3.3%20imageData.data.png)
imageData.data

```js
// 将 imageData 放入 canvas 中
context.putImageData(
  imageData, // 图像的像素信息
  dx, dy, // 
  dirtyX, dirrtyY, // 会累计到 dx, dy
  drityWidth, dirtyHeigh
)
```

![putImageData](img/2.3.3%20putImageData.png)
context.putImageData( imageData, dx, dy, dirtyX, dirrtyY,  drityW, dirtyH )

[Image Editer](code/2.3.3%20imageediter.html)

### 2.3.4 创建 imageData

```js
inmageData = context.createImageDate(
  width, height
)
```

[Create ImageData](code/2.3.4%20createImageData.html)

---

Canvas Demo [学写一个字](code/hand-writing/index.html)  
Canvas Demo [模糊效果](code/blur/index.html)

---

兼容性：[explorercanvas](https://github.com/arv/explorercanvas) - 可兼容 ie 6、7、8等浏览器

```js
<!--[if IE]><script type="text/javascript" src="../excanvas.js"></script><![endif]-->
```

---
canvas 图形库

- [canvasplus](https://code.google.com/archive/p/canvasplus/)
- [ArtisanJS](http://www.ArtisanJS.com) | [Github](https://github.com/davidbrooks/Artisan)
- [RGraph](https://www.rgraph.net/)

---
参考：  

* [Canvas - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API#基础示例)
* [Canvas教程 - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
* [深入HTML5 Canvas](https://joshondesign.com/p/books/canvasdeepdive/title.html)
* [Demo：一个基础的光线追踪器](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/A_basic_ray-caster)

[css3 filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter) - 对图像的处理

---
鸣谢：  
感谢 [liuyubobobo](https://www.imooc.com/t/108955) 的课程

  - [炫丽的倒计时效果Canvas绘图与动画基础
](https://www.imooc.com/learn/133)
  - [Canvas绘图详解
](https://www.imooc.com/learn/185)
- [Canvas玩转图像处理
](https://www.imooc.com/video/9263)
- [学写一个字
](https://www.imooc.com/learn/284)
- [Canvas玩儿转红包照片
](https://www.imooc.com/learn/601)