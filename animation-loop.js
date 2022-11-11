import { Bug } from './bug.js'

export function start(canvasEl) {
  const numBugs = 100

  // state lives in window
  // sue me :)
  window.w = canvasEl.width
  window.h = canvasEl.height
  window.ctx = canvasEl.getContext('2d');
  window.swarm = []

  for (let i = 0; i < numBugs; i++) {
    swarm.push(new Bug())
  }

  tick()

  function tick() {
    window.ctx.clearRect(0,0, w,h)

    for (let bug of swarm) {
      bug.update()
      bug.show()
    }

    requestAnimationFrame(tick)
  }
}
