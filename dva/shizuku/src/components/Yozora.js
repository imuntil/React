import React, {Component} from 'react'
import './Yozora.scss'

class Star {
  constructor(id, x, y, ctx, h) {
    this.id = id
    this.x = x
    this.y = y
    this.r = Math.floor(Math.random() * 2) + 1
    this.color = `rgba(255, 255, 255, ${ (Math.floor(Math.random() * 10) + 1) / 20})`
    this.ctx = ctx
    this.HEIGHT = h
  }
  draw() {
    const ctx = this.ctx
    ctx.fillStyle = this.color
    ctx.shadowBlur = this.r * 2
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false)
    ctx.closePath()
    ctx.fill()
  }
  move() {
    this.y -= .15
    this.y <= -10 && (this.y = this.HEIGHT + 10)
    this.draw()
  }
}

class Dot extends Star {
  static collection = []
  constructor(id, x, y, ctx, h) {
    super(id, x, y)
    this.r = Math.floor(Math.random() * 5) + 1
    this.maxLinks = 2
    this.speed = .5
    this.alpha = .8
    this.aReduction = .02
    this.setColor()
    this.dir = Math.floor(Math.random() * 140) + 200
    this.ctx = ctx
    Dot.collection.push(this)
  }
  static getPreviousDot(id, stepback) {
    if (id === 0 || id - stepback < 0) {
      return false
    }
    return Dot.collection[id - stepback] || false
  }
  move() {
    this.alpha -= this.aReduction
    if (this.a <= 0) {
      this.die()
      return
    }
    this.setColor()
    this.x = this.x + Math.cos(this.deg2Rad(this.dir)) * this.speed
    this.y = this.y + Math.sin(this.deg2Rad(this.dir)) * this.speed
    this.draw()
    this.link()
  }
  link() {
    if (!this.id) {
      return
    }
    const [d1,
      d2,
      d3] = [
      Dot.getPreviousDot(this.id, 1),
      Dot.getPreviousDot(this.id, 2),
      Dot.getPreviousDot(this.id, 3)
    ]
    if (!d1) {
      return
    }
    const ctx = this.ctx
    ctx.strokeStyle = this.linkColor
    ctx.moveTo(d1.x, d1.y)
    ctx.beginPath()
    ctx.lineTo(this.x, this.y)
    d2 && ctx.lineTo(d2.x, d2.y)
    d3 && ctx.lineTo(d3.x, d3.y)
    ctx.stroke()
    ctx.closePath()
  }
  die() {
    Dot.collection[this.id] = null
    delete Dot.collection[this.id]
  }
  setColor() {
    this.color = `rgba(255, 255, 255, ${this.alpha})`
    this.linkColor = `rgba(255, 255, 255, ${this.alpha / 4})`
  }
  deg2Rad(deg) {
    return deg * (Math.PI / 180)
  }
}

class Yozora extends Component {
  canvas
  ctx = null
  starCount = 80
  mouseMoving = false
  stars = []
  dots = Dot.collection
  dotsMinDist = 2
  maxDistFromCursor = 50

  componentDidMount() {
    this.setCanvas()
    this.init()
    let timer
    window.onmousemove = e => {
      this.mouseMoving = true
      this.mouseX = e.clientX
      this.mouseY = e.clientY
      clearInterval(timer)
      timer = setTimeout(() => {
        this.mouseMoving = false
      }, 100)
    }
  }

  setCanvas = () => {
    this.WIDTH = document.documentElement.clientWidth
    this.HEIGHT = document.documentElement.clientHeight
    this
      .canvas
      .setAttribute('width', this.WIDTH)
    this
      .canvas
      .setAttribute('height', this.HEIGHT)
    this.ctx = this
      .canvas
      .getContext('2d')
  }

  init = () => {
    const {ctx, starCount, WIDTH, HEIGHT} = this
    ctx.strokeStyle = '#ffffff'
    ctx.shadowColor = '#ffffff'
    this.stars = [...Array(starCount).keys()].map(v => {
      return new Star(v, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT), ctx, HEIGHT)
    })
    ctx.shadowBlur = 0
    this.animate()
  }

  animate = () => {
    const {ctx, WIDTH, HEIGHT, stars, dots} = this
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    stars.forEach(star => {
      star.move()
    })
    dots.forEach(dot => {
      dot.move()
    })
    this.drawIfMouseMoving()
    requestAnimationFrame(this.animate)
  }

  drawIfMouseMoving = () => {
    if (!this.mouseMoving) 
      return
    const {dots, mouseX, mouseY, dotsMinDist, maxDistFromCursor, ctx} = this
    if (!dots.length) {
      dots[0] = new Dot(0, mouseX, mouseY, ctx)
      dots[0].move()
      return
    }
    const dot = Dot.getPreviousDot(dots.length, 1)
    const {x: prevX, y: prevY} = dot
    const [diffX,
      diffY] = [
      Math.abs(prevX - mouseX),
      Math.abs(prevY - mouseY)
    ]
    if (diffX < dotsMinDist || diffY < dotsMinDist) 
      return
    const xVariation = (Math.random() > .5
      ? -1
      : 1) * Math.floor(Math.random() * maxDistFromCursor) + 1
    const yVariation = (Math.random() > .5
      ? -1
      : 1) * Math.floor(Math.random() * maxDistFromCursor) + 1
    dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation, ctx)
    dots[dots.length - 1].draw()
    dots[dots.length - 1].link()
  }

  render() {
    return (
      <div className="yozora-8uej">
        <canvas id="canvas" ref={canvas => this.canvas = canvas}></canvas>
        <div className="landscape"></div>
        <div className="filter"></div>
      </div>
    )
  }
}

export default Yozora
