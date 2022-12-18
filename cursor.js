
export class Cursor {
  constructor() {
    this.x = 0
    this.y = 0
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.maxForce = 0.01
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    this.vx += this.ax
    this.vy += this.ay

    // prevent accumulating acceleration
    this.ax = 0
    this.ay = 0
  }

  show() {
    window.ctx.save()
    window.ctx.beginPath()
    window.ctx.strokeStyle = "#faa"
    window.ctx.arc(window.captain.x + this.x, window.captain.y + this.y, 3.5, 0, Math.PI * 2, true)
    window.ctx.stroke()
    window.ctx.restore()
  }
}
