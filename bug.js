import p5 from 'p5'
const maxDistance = 100

export class Bug {
  constructor(captain) {
    this.location = new p5.Vector(40, 50)
    this.velocity = new p5.Vector(0, 0)
    this.acceleration = new p5.Vector(0, 0)
    this.captain = captain
  }

  update() {
    this.follow()
    this.location.add(this.velocity)
    //this.wrap()
  }

  follow() {
    const dist = p5.Vector.dist(this.captain.location, this.location)

    if (dist < 60 && dist > 20) {
      const diff = this.captain.location.copy()
      diff.sub(this.location)
      diff.setMag(0.5)
      this.velocity = diff
    } else {
      this.velocity.mult(0.9)
    }
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
    window.ctx.fillStyle = "red"
    window.ctx.arc(this.location.x, this.location.y, 2, 0, Math.PI * 2, true)
    window.ctx.fill()
    window.ctx.restore()
  }
}
