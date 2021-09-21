class Timer {
    #intervalID
    #element
    #current
    #duration
    #running
    #expired

    constructor() {
        this.#intervalID = 0
        this.#current = 0
        this.#duration = 0
        this.#running = false
        this.#expired = false
    }

    // Getters
    get duration() {
        return this.#duration
    }

    get running() {
        return this.#running;
    }

    // Setters
    set #timerText(seconds) {
        this.#element.innerHTML = seconds.toString()
    }

    set duration(duration) {
        if (duration < 0) {
            console.log('Timer duration cannot be negative')
        } else {
            this.#duration = duration;
        }
    }

    set element(element) {
        this.#element = element;
    }

    start() {
        if (this.#running === false && this.#duration > 0) {
            this.#running = true
            this.#expired = false

            this.#intervalID = setInterval(() => {
                if (this.#current >= this.#duration) {
                    this.#expired = true
                    this.stop()
                } else {
                    this.#current++
                }

                console.log('Timer: ' + this.#current.toString())
                this.#timerText = (this.#duration - this.#current).toString()
            }, 1000)
        }
    }

    stop() {
        clearInterval(this.#intervalID)
        this.#running = false
    }

    reset() {
        this.#running = false
        this.#current = 0

        this.#timerText = this.#duration
    }
}

export default Timer