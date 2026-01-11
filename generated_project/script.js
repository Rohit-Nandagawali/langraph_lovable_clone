// script.js – Calculator logic
// This script is loaded with defer, so the DOM is ready when it runs.

// Grab DOM elements
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const resultSpan = document.getElementById('resultValue');
const clearBtn = document.getElementById('clearBtn');
const opButtons = document.querySelectorAll('.op-btn');

/**
 * Convert a raw input value to a Number.
 * Returns NaN if the conversion fails.
 * @param {string} value
 * @returns {number}
 */
function parseInput(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : NaN;
}

// Pure arithmetic functions
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  // Return NaN on division by zero to simplify error handling.
  return b === 0 ? NaN : a / b;
}

/**
 * Compute the result based on the selected operation and display it.
 * @param {string} op - One of 'add', 'sub', 'mul', 'div'
 */
function computeAndDisplay(op) {
  const a = parseInput(num1.value);
  const b = parseInput(num2.value);

  // Validate inputs
  if (Number.isNaN(a) || Number.isNaN(b)) {
    resultSpan.textContent = 'Error: Invalid input';
    return;
  }

  let result;
  switch (op) {
    case 'add':
      result = add(a, b);
      break;
    case 'sub':
      result = sub(a, b);
      break;
    case 'mul':
      result = mul(a, b);
      break;
    case 'div':
      result = div(a, b);
      break;
    default:
      result = NaN;
  }

  // If the operation produced NaN (e.g., division by zero), show an error.
  if (Number.isNaN(result)) {
    resultSpan.textContent = 'Error';
  } else {
    resultSpan.textContent = result;
  }
}

// Attach listeners to operation buttons
opButtons.forEach((button) => {
  const op = button.dataset.op;
  button.addEventListener('click', () => computeAndDisplay(op));
});

// Clear button resets inputs and result
clearBtn.addEventListener('click', () => {
  num1.value = '';
  num2.value = '';
  resultSpan.textContent = '0';
});

// Export operation functions for unit testing
window.calcOps = { add, sub, mul, div };
