import { Bug } from './bug.js'
import { Cursor } from './cursor.js'

const walkSpeed = 2
const cursorSpeed = 2

function log(msg) {
  console.log(msg)
  window.printer.innerHTML = msg + '<br>' + window.printer.innerHTML
}

function set_handlers(name) {
 // Install event handlers for the given element
 const el = document.getElementById(name);
 el.ontouchstart = start_handler;
 el.ontouchmove = move_handler;
 // Use same handler for touchcancel and touchend
 el.ontouchcancel = end_handler;
 el.ontouchend = end_handler;
}

function set_touchpad_handlers(name) {
 // Install event handlers for the given element
 const el = document.getElementById(name);
 el.ontouchstart = start_touchpad_handler;
 el.ontouchmove = move_touchpad_handler;
 // Use same handler for touchcancel and touchend
 el.ontouchcancel = end_touchpad_handler;
 el.ontouchend = end_touchpad_handler;
}

function set_stick_handlers(name) {
 // Install event handlers for the given element
 const el = document.getElementById(name);
 el.ontouchstart = start_stick_handler;
 el.ontouchmove = move_stick_handler;
 // Use same handler for touchcancel and touchend
 el.ontouchcancel = end_stick_handler;
 el.ontouchend = end_stick_handler;
}


// This is a very basic 2-touch move/pinch/zoom handler that does not include
// error handling, only handles horizontal moves, etc.
function handle_pinch_zoom(ev) {
  if (ev.targetTouches.length === 2 && ev.changedTouches.length === 2) {
    // Check if the two target touches are the same ones that started
    // the 2-touch
    const point1 = tpCache.findLastIndex(
      (tp) => tp.identifier === ev.targetTouches[0].identifier
    );
    const point2 = tpCache.findLastIndex(
      (tp) => tp.identifier === ev.targetTouches[1].identifier
    );

    if (point1 >= 0 && point2 >= 0) {
      // Calculate the difference between the start and move coordinates
      const diff1 = Math.abs(tpCache[point1].clientX - ev.targetTouches[0].clientX);
      const diff2 = Math.abs(tpCache[point2].clientX - ev.targetTouches[1].clientX);

      // This threshold is device dependent as well as application specific
      const PINCH_THRESHOLD = 1;
      if (diff1 >= PINCH_THRESHOLD && diff2 >= PINCH_THRESHOLD)
	ev.target.style.background = "green";
    } else {
      // empty tpCache
      window.tpCache = [];
    }
  }
}

function start_handler(ev) {
 // If the user makes simultaneous touches, the browser will fire a
 // separate touchstart event for each touch point. Thus if there are
 // three simultaneous touches, the first touchstart event will have
 // targetTouches length of one, the second event will have a length
 // of two, and so on.
 ev.preventDefault();
 // Cache the touch points for later processing of 2-touch pinch/zoom
 if (ev.targetTouches.length === 2) {
   for (let i = 0; i < ev.targetTouches.length; i++) {
     window.tpCache.push(ev.targetTouches[i]);
   }
 }
 if (window.logEvents) log("touchStart", ev, true);
 update_background(ev);
}

function start_touchpad_handler(ev) {
 ev.preventDefault();
 if (ev.targetTouches.length === 2) {
   for (let i = 0; i < ev.targetTouches.length; i++) {
     window.tpCache.push(ev.targetTouches[i]);
   }
 }
 if (window.logEvents) log("touchStart", ev, true);
 update_touchpad(ev);
}

function start_stick_handler(ev) {
 // If the user makes simultaneous touches, the browser will fire a
 // separate touchstart event for each touch point. Thus if there are
 // three simultaneous touches, the first touchstart event will have
 // targetTouches length of one, the second event will have a length
 // of two, and so on.
 ev.preventDefault();
 // Cache the touch points for later processing of 2-touch pinch/zoom
 if (ev.targetTouches.length === 2) {
   for (let i = 0; i < ev.targetTouches.length; i++) {
     window.tpCache.push(ev.targetTouches[i]);
   }
 }
 if (window.logEvents) log("touchStart", ev, true);
 update_stick(ev);
}

function move_handler(ev) {
 // Note: if the user makes more than one "simultaneous" touches, most browsers
 // fire at least one touchmove event and some will fire several touchmoves.
 // Consequently, an application might want to "ignore" some touchmoves.
 //
 // This function sets the target element's border to "dashed" to visually
 // indicate the target received a move event.
 //
 ev.preventDefault();
 if (window.logEvents) log("touchMove", ev, false);

 // To avoid too much color flashing many touchmove events are started,
 // don't update the background if two touch points are active
 if (!(ev.touches.length === 2 && ev.targetTouches.length === 2))
   update_background(ev);

 // Set the target element's border to dashed to give a clear visual
 // indication the element received a move event.
 ev.target.style.border = "dashed";

 // Check this event for 2-touch Move/Pinch/Zoom gesture
 handle_pinch_zoom(ev);
}

function move_touchpad_handler(ev) {
 ev.preventDefault();
 if (ev.targetTouches.length === 2) {
   for (let i = 0; i < ev.targetTouches.length; i++) {
     window.tpCache.push(ev.targetTouches[i]);
   }
 }
 if (window.logEvents) log("touchStart", ev, true);


  switch (ev.targetTouches.length) {
    case 1:
      // Single tap
      const xDiff = ev.targetTouches[0].screenX - window.touchpadState.prev.targetTouches[0].screenX
      const yDiff = ev.targetTouches[0].screenY - window.touchpadState.prev.targetTouches[0].screenY
      window.cursor.x += xDiff * cursorSpeed
      window.cursor.y += yDiff * cursorSpeed
      break;
    case 2:
      // Two simultaneous touches
      break;
    default:
      // More than two simultaneous touches
  }

 update_touchpad(ev);
}

function move_stick_handler(ev) {
 ev.preventDefault();
 if (window.logEvents) log("touchMove", ev, false);

 // don't if two touch points are active
  if (!(ev.touches.length === 2 && ev.targetTouches.length === 2)) {
    const rect = ev.target.getBoundingClientRect()
    const xOnEl = ev.targetTouches[0].clientX - rect.left
    const xNormalized = xOnEl / rect.width
    const x = xNormalized * 2 - 1

    const yOnEl = ev.targetTouches[0].clientY - rect.top
    const yNormalized = yOnEl / rect.height
    const y = yNormalized * 2 - 1

    window.captain.vx = x * walkSpeed
    window.captain.vy = y * walkSpeed
  }

   update_stick(ev);

 // Check this event for 2-touch Move/Pinch/Zoom gesture
 handle_pinch_zoom(ev);
}

function end_handler(ev) {
  ev.preventDefault();
  if (window.logEvents) log(ev.type, ev, false);
  if (ev.targetTouches.length === 0) {
    // Restore background and border to original values
    ev.target.style.background = "";
    ev.target.style.border = "1px solid black";
  }
}

function end_touchpad_handler(ev) {
 ev.preventDefault();
  if (window.logEvents) log(ev.type, ev, false);
  if (ev.targetTouches.length === 0) {
    // Restore background and border to original values
  }
 update_touchpad(ev);
}

function end_stick_handler(ev) {
  ev.preventDefault();
  if (window.logEvents) log(ev.type, ev, false);
  if (ev.targetTouches.length === 0) {
    window.captain.vx = 0
    window.captain.vy = 0
  }
}

function update_stick(ev) {
 switch (ev.targetTouches.length) {
   case 1:
     // Single tap`
     break;
   case 2:
     // Two simultaneous touches
     break;
   default:
     // More than two simultaneous touches
 }
}

function update_touchpad(ev) {
 switch (ev.targetTouches.length) {
   case 1:
     // Single tap
     break;
   case 2:
     // Two simultaneous touches
     break;
   default:
     // More than two simultaneous touches
 }

  window.touchpadState.prev = ev
}

function update_background(ev) {
 // Change background color based on the number simultaneous touches
 // in the event's targetTouches list:
 //   yellow - one tap (or hold)
 //   pink - two taps
 //   lightblue - more than two taps
 switch (ev.targetTouches.length) {
   case 1:
     // Single tap`
     ev.target.style.background = "yellow";
     break;
   case 2:
     // Two simultaneous touches
     ev.target.style.background = "pink";
     break;
   default:
     // More than two simultaneous touches
     ev.target.style.background = "lightblue";
 }
}

function tickIndefinitely() {
  tick()

  requestAnimationFrame(tickIndefinitely)
}

function tick() {
  window.ctx.clearRect(0,0, w,h)

  for (let bug of swarm) {
    bug.update()
    bug.show()
  }
}

export function start(canvasEl) {
  // global state lives in window
  // sue me :)
  window.w = canvasEl.width
  window.h = canvasEl.height
  window.ctx = canvasEl.getContext('2d');
  window.swarm = []
  window.captain = new Bug()
  window.cursor = new Cursor()
  window.tpCache = []
  window.touchpadState = { prev: {} }
  window.stickState = []
  window.logEvents = false
  const printer = document.getElementById('printer')

  swarm.push(window.captain)
  swarm.push(window.cursor)

 set_stick_handlers("stick");
 set_touchpad_handlers("touchpad");
 //set_handlers("touchpad");
 //set_stick_handlers("stick");
 //set_touchpad_handlers("touchpad");

  tickIndefinitely()
}
