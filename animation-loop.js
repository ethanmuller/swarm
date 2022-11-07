export function start(canvasEl) {
  const w = canvasEl.width
  const h = canvasEl.height
  const numBugs = 50

  const localDistance = 1

  let ctx = canvasEl.getContext('2d');

  const swarm = []

  for (let i = 0; i < numBugs; i++) {
    swarm.push({
      x: Math.random() * w,
      y: Math.random() * h,
      ax: Math.random() * 2 - 1,
      ay: Math.random() * 2 - 1,
    })
  }

  tick()

  function separation(bug) {
    const me = bug
    bug.fx = 0
    bug.fy = 0

    for (const i in swarm) {
      const them = swarm[i]
      const distance = Math.sqrt( Math.pow(them.x - me.x, 2) + Math.pow(them.y - me.y, 2) )

      if (distance < localDistance) {
        //me.close = true
      }
    }
  }

  function move(bug) {
    separation(bug)

    //bug.ax += bug.fx
    //bug.ay += bug.fy

    bug.x = (bug.x + bug.ax)
    bug.y = (bug.y + bug.ay)

    wrap(bug)
  }

  function wrap(bug) {
    if (bug.x > w) {
      bug.x = 0
    } else if (bug.x < 0) {
      bug.x = w
    }

    if (bug.y > h) {
      bug.y = 0
    } else if (bug.y < 0) {
      bug.y = h
    }
  }

  function draw(bug) {
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "white"
    if (bug.close) {
      ctx.fillStyle = "red"
    }
    ctx.arc(bug.x, bug.y, 3, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()
  }

  function tick() {
    ctx.clearRect(0,0, w,h)
    for (const i in swarm) {
      draw(swarm[i])
      move(swarm[i])
    }
    requestAnimationFrame(tick)
  }
}
