const difficulty_amateur = { multiplier: 1, timer: 5 }
const difficulty_intermediate = { multiplier: 2, timer: 2 }
const difficulty_professional = { multiplier: 3, timer: 0 }

// Difficulty checkboxes
let cbAma = null
let cbInt = null
let cbPro = null

// Timer
let counter = { start: 0, current: 0, intervalID: null, running: false}
let timer = null
let start = null
let stopReset = null

window.addEventListener('load', init, false)

function init() {
    // Get elements
    cbAma = document.getElementById('difficulty_amateur')
    cbInt = document.getElementById('difficulty_intermediate')
    cbPro = document.getElementById('difficulty_professional')

    timer = getTimer()
    start = document.getElementById('start_timer')
    stopReset = document.getElementById('stop_timer')

    cbAma.checked = false
    cbInt.checked = false
    cbPro.checked = false

    // Add event listeners
    cbAma.addEventListener('change', () => difficultyHandler(difficulty_amateur))
    cbInt.addEventListener('change', () => difficultyHandler(difficulty_intermediate))
    cbPro.addEventListener('change', () => difficultyHandler(difficulty_professional))

    start.addEventListener('click', timerStart)
    stopReset.addEventListener('click', timerStop)
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

    counter.start = 60 * difficulty.timer
    setTimer(counter.start)
}

function getTimer() {
    return document.getElementById('timer_counter')
}

function setTimer(seconds) {
    let _t = getTimer()
    _t.innerHTML = seconds.toString()
}

function difficultyClearAll() {
    cbAma.checked = cbInt.checked = cbPro.checked = false
}

function timerStart() {
    console.log(counter)
    if (counter.running !== false && counter.start <= 0) {
        return
    }

    counter.running = true
    counter.intervalID = setInterval(() => {
        counter.current++
        setTimer(counter.start - counter.current)
    }, 1000)

    console.log(counter.intervalID + ': START')
}

function timerStop() {
    clearInterval(counter.intervalID)
    counter.running = false

    console.log(counter.intervalID + ': STOP')
}