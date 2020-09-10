function startGame () {
    OLED.clear()
    gameOn = true
    myScore = 0
    question = 0
    number1 = 0
    number2 = 0
    solution = 0
    myAnswer = 0
    power = 0
    seconds = -1
    submit = false
}
function setNewQuestion () {
    OLED.clear()
    submit = false
    myAnswer = 0
    power = 2
    if (question < 10) {
        question += 1
        music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.OnceInBackground)
        basic.showString("Q")
        basic.showNumber(question)
        basic.pause(1000)
        number1 = randint(10, 30)
        number2 = randint(10, 30)
        solution = number1 * number2
        OLED.writeNumNewLine(number1)
        OLED.writeString("X")
        OLED.writeNum(number2)
        OLED.writeString("=?")
        OLED.newLine()
        basic.pause(1000)
        seconds = 20 - question
    } else {
        gameOn = false
        music.startMelody(music.builtInMelody(Melodies.Punchline), MelodyOptions.OnceInBackground)
        basic.showString("THE END!")
        basic.showIcon(IconNames.Happy)
        OLED.writeStringNewLine("YOUR SCORE:")
        OLED.writeNum(myScore)
        OLED.newLine()
        OLED.writeStringNewLine("PRESS D TO RESTART")
    }
}
let submit = false
let seconds = 0
let power = 0
let myAnswer = 0
let solution = 0
let number2 = 0
let number1 = 0
let question = 0
let myScore = 0
let gameOn = false
OLED.init(128, 64)
music.startMelody(music.builtInMelody(Melodies.Blues), MelodyOptions.ForeverInBackground)
let readInstructions = false
OLED.writeStringNewLine("MATH BLITZ: A MULTIPLICATION game!")
OLED.writeStringNewLine("10 Qns, each worth +1")
OLED.writeStringNewLine("toggle: hundreds/tens/ones")
OLED.writeStringNewLine("digits: 0-9")
OLED.writeStringNewLine("PRESS A FOR INSTRUCTIONS")
basic.forever(function () {
    while (gameOn == false) {
        basic.showString("<MATH BLITZ>")
    }
})
basic.forever(function () {
    if (gameOn == true) {
        while (!(myAnswer == solution && submit == true) && seconds > 0) {
            basic.showNumber(seconds)
            basic.pause(1000)
            seconds += -1
        }
        if (myAnswer == solution && submit == true) {
            music.startMelody(music.builtInMelody(Melodies.BaDing), MelodyOptions.OnceInBackground)
            basic.showIcon(IconNames.Yes)
            OLED.clear()
            OLED.writeStringNewLine("GOOD JOB!")
            basic.pause(1000)
            myScore += 1
            OLED.writeStringNewLine("SCORE:")
            OLED.writeNum(myScore)
            basic.pause(1000)
            setNewQuestion()
        } else if (seconds == 0) {
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)
            basic.showIcon(IconNames.Diamond)
            basic.showIcon(IconNames.SmallDiamond)
            basic.showIcon(IconNames.No)
            OLED.writeStringNewLine("TIME'S UP!")
            basic.pause(1000)
            OLED.writeStringNewLine("SCORE:")
            OLED.writeNum(myScore)
            basic.pause(1000)
            setNewQuestion()
        }
    }
})
basic.forever(function () {
    if (gameOn == true) {
        if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P2)) {
            if (power == 0 || power == 1) {
                power += 1
                basic.pause(300)
            }
        } else if (tinkercademy.ADKeyboard(ADKeys.B, AnalogPin.P2)) {
            if (power == 1 || power == 2) {
                power += -1
                basic.pause(300)
            }
        } else if (tinkercademy.ADKeyboard(ADKeys.C, AnalogPin.P2)) {
            myAnswer += 1 * 10 ** power
            OLED.clear()
            OLED.writeNumNewLine(number1)
            OLED.writeString("X")
            OLED.writeNum(number2)
            OLED.writeString("=?")
            OLED.newLine()
            OLED.writeNumNewLine(myAnswer)
        } else if (tinkercademy.ADKeyboard(ADKeys.D, AnalogPin.P2)) {
            submit = true
        } else if (tinkercademy.ADKeyboard(ADKeys.E, AnalogPin.P2)) {
            myAnswer += -1 * 10 ** power
            OLED.clear()
            OLED.writeNumNewLine(number1)
            OLED.writeString("X")
            OLED.writeNum(number2)
            OLED.writeString("=?")
            OLED.newLine()
            OLED.writeNumNewLine(myAnswer)
        }
    } else if (gameOn == false) {
        if (tinkercademy.ADKeyboard(ADKeys.A, AnalogPin.P2) && readInstructions == false) {
            OLED.clear()
            OLED.writeStringNewLine("How to play:")
            OLED.writeStringNewLine("A toggles up")
            OLED.writeStringNewLine("B toggles down")
            OLED.writeStringNewLine("C for higher digit ")
            OLED.writeStringNewLine("E for lower digit")
            OLED.writeStringNewLine("D to submit answer")
            OLED.newLine()
            OLED.writeStringNewLine("PRESS D TO START")
            readInstructions = true
        } else if (tinkercademy.ADKeyboard(ADKeys.D, AnalogPin.P2) && readInstructions == true) {
            music.stopMelody(MelodyStopOptions.All)
            startGame()
            setNewQuestion()
        }
    }
})
