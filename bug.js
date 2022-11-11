
export class Bug {
  constructor() {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.aligning = true
    this.vx = (Math.random() * 2 - 1) * (this.aligning ? 5 : .3)
    this.vy = (Math.random() * 2 - 1) * (this.aligning ? 5 : .3)
    this.ax = 0
    this.ay = 0
    this.maxForce = 0.01
  }

  update() {
    this.x += this.vx
    this.y += this.vy

    // prevent accumulating acceleration
    this.ax = 0
    this.ay = 0


    if (this.aligning) {
      this.align()
    }

    this.vx += this.ax
    this.vy += this.ay

    this.wrap()
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
      // const mag = Math.sqrt(avgX*avgX + avgY*avgY)
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
    window.ctx.fillStyle = "white"
    window.ctx.arc(this.x, this.y, 3, 0, Math.PI * 2, true)
    window.ctx.fill()
    window.ctx.restore()
  }
}
