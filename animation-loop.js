export function start(canvasEl) {
  let ctx = canvasEl.getContext('2d');
  let x = 15
  let y = 10
  tick()

  function tick() {
    ctx.clearRect(0,0, 64,64)
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(x, y, 3, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.restore()
    x = (x + .3) % 64
    y = (y + .2) % 64
    requestAnimationFrame(tick)
  }
}
