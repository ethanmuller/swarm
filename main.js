import './style.css'
import javascriptLogo from './javascript.svg'
import { start } from './animation-loop.js'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="screen" width="228" height="128"></canvas>
  </div>
`

start(document.querySelector('#screen'))
