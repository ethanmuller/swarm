import './style.css'
import javascriptLogo from './javascript.svg'
import { start } from './animation-loop.js'

document.querySelector('#app').innerHTML = `
  <div>
    <canvas id="screen" width="114" height="64"></canvas>
  </div>
`

start(document.querySelector('#screen'))
