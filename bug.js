import p5 from 'p5'


const maxDistance = 100
const captRadius = 10

export class Bug {
  constructor(captain) {
    this.location = new p5.Vector(40, 50)
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.aligning = true
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.maxForce = 0.01
    this.captain = captain
  }

  update() {
    const diffX = this.captain.x - this.x
    const diffY = this.captain.y - this.y

    if (Math.abs(diffX) < maxDistance &&
        Math.abs(diffX) > captRadius) {
      this.vx = diffX * 0.02
      this.vy = diffY * 0.02
      this.x += this.vx
      this.y += this.vy
    }
  }

  align() {
    const localDistanceLimit = 20

    let avgX = 0
    let avgY = 0
    let total = 0

    for (let other of swarm) {
      const distance = Math.sqrt( Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2) )
      if (other !== this && distance < localDistanceLimit) {
        avgX += other.vx
        avgY += other.vy
        total++
      }
    }

    if (total > 0) {
      avgX = avgX / total
      avgY = avgY / total

      // limit maginitude to maxForce
      //const mag = Math.sqrt(avgX*avgX + avgY*avgY)
      // avgX = avgX * this.maxForce / mag
      // avgY = avgY * this.maxForce / mag
    }

    this.ax += avgX - this.vx
    this.ay += avgY - this.vy
  }

  wrap() {
    if (this.x > w) {
      this.x = 0
    } else if (this.x < 0) {
      this.x = w
    }

    if (this.y > h) {
      this.y = 0
    } else if (this.y < 0) {
      this.y = h
    }
  }

  show() {
    window.ctx.save()
    window.ctx.beginPath()
    window.ctx.fillStyle = "red"
    window.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, true)
    window.ctx.fill()
    window.ctx.restore()
  }
}
