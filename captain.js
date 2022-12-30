import p5 from 'p5'

export class Captain {
  constructor() {
    this.location = new p5.Vector(w/2, h/2)
    this.velocity = new p5.Vector(0, 0)
    this.acceleration = new p5.Vector(0, 0)
  }

  update() {
    this.location.add(this.velocity)
    this.wrap()
  }

  wrap() {
    if (this.location.x > w) {
      this.location.x = 0
    } else if (this.location.x < 0) {
      this.location.x = w
    }

    if (this.location.y > h) {
      this.location.y = 0
    } else if (this.location.y < 0) {
      this.location.y = h
    }
  }

  show() {
    window.ctx.save()
    window.ctx.beginPath()
    window.ctx.fillStyle = "white"
    window.ctx.arc(this.location.x, this.location.y, 6, 0, Math.PI * 2, true)
    window.ctx.fill()
    window.ctx.restore()
  }
}
