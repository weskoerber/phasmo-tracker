import Timer from './js/timer.js'
const timer = new Timer()

const difficulty = {
    amateur: {
        multiplier: 1,
        timer: 5,
        element: null
    },
    intermediate: {
        multiplier: 2,
        timer: 2,
        element: null
    },
    professional: {
        multiplier: 3,
        timer: 0,
        element: null
    },
    selected: null
}

const evidence = {
    emf: {
        selected: 'none',
        element: null,
    },
    box: {
        selected: 'none',
        element: null,
    },
    prints: {
        selected: 'none',
        element: null,
    },
    orbs: {
        selected: 'none',
        element: null,
    },
    writing: {
        selected: 'none',
        element: null,
    },
    freezing: {
        selected: 'none',
        element: null,
    },
    dots: {
        selected: 'none',
        element: null,
    },
}

let start = null
let stop = null
let reset = false

window.addEventListener('load', init, false)

function init() {
    // Get elements
    difficulty.amateur.element = document.getElementById('difficulty_amateur')
    difficulty.intermediate.element = document.getElementById('difficulty_intermediate')
    difficulty.professional.element = document.getElementById('difficulty_professional')

    evidence.emf.element = document.getElementById('emf_button')
    evidence.box.element = document.getElementById('spirit_box_button')
    evidence.prints.element = document.getElementById('prints_button')
    evidence.orbs.element = document.getElementById('orbs_button')
    evidence.writing.element = document.getElementById('writing_button')
    evidence.freezing.element = document.getElementById('freezing_button')
    evidence.dots.element = document.getElementById('dots_button')

    start = document.getElementById('start_timer')
    stop = document.getElementById('stop_timer')

    timer.element = document.getElementById('timer_counter')

    // Add event listeners
    difficulty.amateur.element.addEventListener('change', () => difficultyHandler(difficulty.amateur))
    difficulty.intermediate.element.addEventListener('change', () => difficultyHandler(difficulty.intermediate))
    difficulty.professional.element.addEventListener('change', () => difficultyHandler(difficulty.professional))

    evidence.emf.element.addEventListener('click', () => evidenceHandler(evidence.emf))
    evidence.box.element.addEventListener('click', () => evidenceHandler(evidence.box))
    evidence.prints.element.addEventListener('click', () => evidenceHandler(evidence.prints))
    evidence.orbs.element.addEventListener('click', () => evidenceHandler(evidence.orbs))
    evidence.writing.element.addEventListener('click', () => evidenceHandler(evidence.writing))
    evidence.freezing.element.addEventListener('click', () => evidenceHandler(evidence.freezing))
    evidence.dots.element.addEventListener('click', () => evidenceHandler(evidence.dots))

    start.addEventListener('click', () => {
        if (timer.duration > 0) {
            timer.start()
            start.disabled = true
        }
    })
    stop.addEventListener('click', () => {
        start.disabled = false
        if (timer.duration > 0) {
            if (reset === false && timer.running === true) {
                timer.stop()
                reset = true
                stop.classList.remove('is-warning')
                stop.classList.add('is-danger')
                stop.innerHTML = 'Reset'
            } else {
                reset = false
                stop.classList.remove('is-danger')
                stop.classList.add('is-warning')
                stop.innerHTML = 'Stop'
                timer.reset()
            }
        }
    })
}

function difficultyHandler(difficulty) {
    difficultyClearAll()

    difficulty.selected = difficulty
    switch (difficulty) {
        case difficulty.amateur:
            difficulty.amateur.element.checked = true
            break
        case difficulty.intermediate:
            difficulty.intermediate.element.checked = true
            break
        case difficulty.professional:
            difficulty.professional.element.checked = true
            break
    }

    timer.duration = (60 * difficulty.timer)
    document.getElementById('timer_counter').innerHTML = timer.duration.toString()
}

function evidenceHandler(evidence) {
    switch (evidence.selected) {
        case 'none':
            evidence.selected = 'yes'
            evidence.element.classList.remove('is-light')
            evidence.element.classList.add('is-success')
            break
        case 'yes':
            evidence.selected = 'no'
            evidence.element.classList.remove('is-success')
            evidence.element.classList.add('is-danger')
            break
        case 'no':
            evidence.selected = 'none'
            evidence.element.classList.remove('is-danger')
            evidence.element.classList.add('is-light')
            break
    }
}

function difficultyClearAll() {
    difficulty.amateur.element.checked = false
    difficulty.intermediate.element.checked = false
    difficulty.professional.element.checked = false
}