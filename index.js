class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }



  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '/':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }
  modify(modifier) {
    let computation
    const current = parseFloat(this.currentOperand)
    if (isNaN(current)) return
    switch (modifier) {
      case '%':
        computation = current / 100
        break
      case '1/x':
        computation = 1 / current
        break
      case 'x^2':
        computation = current * current
        break
      case '2√x':
        computation = Math.sqrt(current)
        break
      default:
        return
    }
    this.currentOperand = computation
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const modifyButtons = document.querySelectorAll('[data-modify]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

modifyButtons.forEach( button => {
  button.addEventListener('click', () => {
    calculator.modify(button.innerText)
    calculator.updateDisplay()
  })
})

document.onkeydown = function(evt) {
  if(!isNaN(evt.key)) {
    calculator.appendNumber(evt.key)
    calculator.updateDisplay()
  }
  else if (evt.key === '.') {
    calculator.appendNumber(evt.key)
    calculator.updateDisplay()
  }
  else if (evt.key === '+' || evt.key === '-' || evt.key === '*' || evt.key === '/') {
    calculator.chooseOperation(evt.key)
    calculator.updateDisplay()
  }
  else if (evt.key === 'Enter' || evt.key === '=' || evt.key === ' ') {
    calculator.compute()
    calculator.updateDisplay()
  }
  else if (evt.key === 'Backspace') {
    calculator.delete()
    calculator.updateDisplay()
  }
  else if (evt.key === '%' || evt.key === 'f' || evt.key === 's' || evt.key === 'r' || evt.key === 'F' || evt.key === 'S' || evt.key === 'R') {
    calculator.modify(evt.key)
    calculator.updateDisplay()
    switch (evt.key.toLowerCase()) {
      case '%':
        calculator.modify(evt.key)
        calculator.updateDisplay()
        break
      case 'f':
        calculator.modify('1/x')
        calculator.updateDisplay()
        break
      case 's':
        calculator.modify('x^2')
        calculator.updateDisplay()
        break
      case 'r':
        calculator.modify('2√x')
        calculator.updateDisplay()
        break
      default:
        return
    }
  }
  else if (evt.key === 'a' || evt.key === 'A') {
    calculator.clear()
    calculator.updateDisplay()
  }
  
}