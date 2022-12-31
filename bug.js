import p5 from 'p5'
const maxDistance = 100

    const PERCEPTION_RADIUS = 60
    const TOUCH_RADIUS = 20
    const CAPTAIN_RADIUS = 15
    const BUG_RADIUS = 15

export class Bug {
  constructor(captain) {
    this.location = new p5.Vector(w*Math.random(), h*Math.random())
    this.velocity = new p5.Vector(0, 0)
    this.acceleration = new p5.Vector(0, 0)
    this.captain = captain

    // 0 = WAITING
    // 1 = FOLLOWING
    // 2 = FLYING
    this.mode = 0
  }

  update() {
    switch (this.mode) {
      case 0:
        this.wait()
        break;
      case 1:
        this.follow()
        this.avoid()
        break;
      case 2:
        this.fly()
        break;
    }
    this.location.add(this.velocity)
    //this.wrap()
  }

  avoid() {
    // look at all other bugs and move in the opposite direction
    let closestBug
    let closestDist = Infinity

    for (let i = 0; i < bugs.length; i++) {
      if (bugs[i] === this) continue
      const dist = p5.Vector.dist(this.location, bugs[i].location)
      if (dist < closestDist) {
        closestBug = bugs[i]
        closestDist = dist
      }
    }

    if (closestDist < BUG_RADIUS) {
      const diff = closestBug.location.copy()
      diff.sub(this.location)
      diff.mult(-1)
      diff.limit(0.1)
      this.velocity.add(diff)
    }
  }

  fly() {
    const t = (Date.now() - this.throwTime) / (this.landTime - this.throwTime)
    if (t < 1) {
      this.location = p5.Vector.lerp(this.a, this.b, t)
      this.location.y += Math.sin(Math.PI * t) * 30 * -1
    } else {
      this.mode = 0
    }
    //this.location.x = p5.lerp(this.a.x, this.b.x, t)
    //this.location.y = p5.lerp(this.a.y, this.b.y, t)
  }

  wait() {
    const dist = p5.Vector.dist(this.captain.location, this.location)

    if (dist < TOUCH_RADIUS) {
      this.mode = 1
    }
  }

  follow() {
    const dist = p5.Vector.dist(this.captain.location, this.location)

    if (dist < PERCEPTION_RADIUS && dist > CAPTAIN_RADIUS) {
      const diff = this.captain.location.copy()
      diff.sub(this.location)
      diff.setMag(0.7)
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
    if (this.mode === 0) {
      window.ctx.fillStyle = "pink"
    }
    if (this.mode === 1 || this.mode === 2) {
      window.ctx.fillStyle = "red"
    }
    window.ctx.arc(this.location.x, this.location.y, 2, 0, Math.PI * 2, true)
    window.ctx.fill()
    window.ctx.restore()
  }
}
