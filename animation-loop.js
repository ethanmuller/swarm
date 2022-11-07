export function start(canvasEl) {
  const w = canvasEl.width
  const h = canvasEl.height

  let ctx = canvasEl.getContext('2d');

  const swarm = []

  for (let i = 0; i < 10; i++) {
    swarm.push({
      x: Math.random() * w,
      y: Math.random() * h,
      ax: Math.random() * 2 - 1,
      ay: Math.random() * 2 - 1,
    })
  }

  tick()

  function move(bug) {
    bug.x = (bug.x + bug.ax) % w
    bug.y = (bug.y + bug.ay) % h
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
