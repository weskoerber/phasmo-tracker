import Timer from './js/timer.js'
const timer = new Timer()

const difficulty_amateur = { multiplier: 1, timer: 5 }
const difficulty_intermediate = { multiplier: 2, timer: 2 }
const difficulty_professional = { multiplier: 3, timer: 0 }

// Difficulty checkboxes
let cbAma = null
let cbInt = null
let cbPro = null

let start = null
let stop = null
let reset = false

window.addEventListener('load', init, false)

function init() {
    // Get elements
    cbAma = document.getElementById('difficulty_amateur')
    cbInt = document.getElementById('difficulty_intermediate')
    cbPro = document.getElementById('difficulty_professional')

    start = document.getElementById('start_timer')
    stop = document.getElementById('stop_timer')

    timer.element = document.getElementById('timer_counter')

    cbAma.checked = false
    cbInt.checked = false
    cbPro.checked = false

    // Add event listeners
    cbAma.addEventListener('change', () => difficultyHandler(difficulty_amateur))
    cbInt.addEventListener('change', () => difficultyHandler(difficulty_intermediate))
    cbPro.addEventListener('change', () => difficultyHandler(difficulty_professional))

    start.addEventListener('click', () => timer.start())
    stop.addEventListener('click', () => {
        timer.stop()
        if (reset === false && timer.running === true) {
            reset = true
            stop.value = 'Reset'
        } else {
            reset = false
            stop.value = 'Stop'
            timer.reset()
        }
    })
}

function difficultyHandler(difficulty) {
    difficultyClearAll()

    switch (difficulty) {
        case difficulty_amateur:
            cbAma.checked = true
            break
        case difficulty_intermediate:
            cbInt.checked = true
            break
        case difficulty_professional:
            cbPro.checked = true
            break
    }

    timer.duration = (60 * difficulty.timer)
    document.getElementById('timer_counter').innerHTML = timer.duration.toString()
}

function difficultyClearAll() {
    cbAma.checked = cbInt.checked = cbPro.checked = false
}