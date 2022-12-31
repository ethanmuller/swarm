import p5 from 'p5'

export class Cursor {
  constructor() {
    this.location = new p5.Vector(30, 0)
  }

  update() {
    this.location.limit(75)
  }

  show() {
    window.ctx.save()
    window.ctx.beginPath()
    window.ctx.strokeStyle = "#faa"
    window.ctx.arc(window.captain.location.x + this.location.x, window.captain.location.y + this.location.y, 3.5, 0, Math.PI * 2, true)
    window.ctx.stroke()
    window.ctx.restore()
  }
}
