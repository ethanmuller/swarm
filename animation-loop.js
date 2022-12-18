import { Bug } from './bug.js'
import { Cursor } from './cursor.js'

const speed = 3;

function handleTouchStart(e) {
  e.preventDefault()

  if (e.target.id === 'movement') {
    window.walkTouch = e.changedTouches[0].identifier
    handleMoveTouch(e)
  }
  if (e.target.id === 'verbs') {
    window.verbTouch = e.changedTouches[0].identifier
    handleVerbTouch(e)
  }
}

function handleTouch(e) {
  if (e.target.id === 'movement') {
    handleMoveTouch(e)
  }
  if (e.target.id === 'verbs') {
    handleVerbTouch(e)
  }
}
function handleTouchEnd(e) {
  if (e.target.id === 'movement') {
    if (window.walkTouch !== e.changedTouches[0].identifier) {
      return
    }

    window.captain.vx = 0
    window.captain.vy = 0
    window.walkTouch = null
  }
  if (e.target.id === 'verbs') {
    if (window.verbTouch !== e.changedTouches[0].identifier) {
      return
    }

    window.verbTouch = null
  }
}

function getTouch() {
  // given an event object and a strinthis.xg of "move" or "verbs",
  // return the appropriate multitouch touch on the event
}

function handleVerbTouch(e) {

  if (window.verbTouch !== e.changedTouches[0].identifier) {
    return
  }

  const offsetRect = e.target.getBoundingClientRect()
  // const dx = ((e.changedTouches[0].clientX - offsetRect.x) / offsetRect.width * 2 - 1)
  // const dy = ((e.changedTouches[0].clientY - offsetRect.y) / offsetRect.height * 2 - 1)

  if (window.prevX && window.prevY && e.type !== 'touchstart') {
    const velX = e.changedTouches[0].clientX - window.prevX
    const velY = e.changedTouches[0].clientY - window.prevY

    window.cursor.x = window.cursor.x + velX
    window.cursor.y = window.cursor.y + velY
  }

  window.prevX = e.changedTouches[0].clientX
  window.prevY = e.changedTouches[0].clientY

}

function print(msg) {
  console.log(msg)
  const printer = document.getElementById('printer')
  printer.innerHTML = msg + '<br>' + printer.innerHTML
}

function handleMoveTouch(e) {
  if (window.walkTouch !== e.changedTouches[0].identifier) {
    return
  }

  const rect = e.target.getBoundingClientRect()

  const vx = ((e.changedTouches[0].clientX - rect.x) / rect.width * 2 - 1) * speed
  const vy = ((e.changedTouches[0].clientY - rect.y) / rect.height * 2 - 1) * speed
  window.captain.vx = vx
  window.captain.vy = vy
}

export function start(canvasEl) {
  // state lives in window
  // sue me :)
  window.w = canvasEl.width
  window.h = canvasEl.height
  window.ctx = canvasEl.getContext('2d');
  window.swarm = []
  window.captain = new Bug()
  window.cursor = new Cursor()
  window.walkTouch = null
  window.verbTouch = null

  swarm.push(window.captain)
  swarm.push(window.cursor)

  tick()

  function tick() {
    window.ctx.clearRect(0,0, w,h)

    for (let bug of swarm) {
      bug.update()
      bug.show()
    }

    requestAnimationFrame(tick)
  }

  document.addEventListener('touchstart', handleTouchStart)
  document.addEventListener('touchmove', handleTouch)
  document.addEventListener('touchend', handleTouchEnd)
}
