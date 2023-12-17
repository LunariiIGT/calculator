let firstNum = 0;
let secondNum = 0;
let result = 0
let hasOperation = false;
let decimal = false;
let lastInput = "num";
let display = "";
let operation = "+";
let reachedLength = false;

const numButton = document.querySelectorAll(".numButton");
const opButton = document.querySelectorAll(".opButton");
const decButton = document.querySelector("#butDot");
const eqButton = document.querySelector(".eqButton");
const acButton = document.querySelector("#butAC");
const cButton = document.querySelector("#butC");

const subButton = document.querySelector("#opMin");
const plusButton = document.querySelector("#opSum");
const multButton = document.querySelector("#opMul");
const divButton = document.querySelector("#opDiv");

const displayText = document.querySelector(".disOperations");
const resultText = document.querySelector(".disResult");


numButton.forEach((numButton) => {
    numButton.addEventListener('click', function() {
        if (!reachedLength) {
            display += String(numButton.dataset.value);
            displayText.innerHTML = display;
            displayChange();
            lastInput = "num";
    }})
})

decButton.addEventListener("click", function() {
    if (!decimal && lastInput !== "op" && !reachedLength) {
        display += String('.');
        displayText.innerHTML = display;
        displayChange();
        lastInput = "dec";
        decimal = true;
    }
})

opButton.forEach((opButton) => {
    opButton.addEventListener('click', function() {
        if (lastInput !== "op" && lastInput !== "dec" && !hasOperation && !reachedLength) {
            firstNum = Number(display);

            display += String(opButton.dataset.value);
            displayText.innerHTML = display;
            displayChange();

            decimal = false;
            lastInput = "op";
            operation = opButton.dataset.value;

            hasOperation = true;
        } else if (lastInput !== "op" && lastInput !== "dec" && hasOperation && !reachedLength) {
            const numSep = display.split(`${operation}`);
            
            secondNum = Number(numSep[1]);
            operate(Number(firstNum), Number(secondNum), operation);
        } else if (lastInput === "op" && lastInput !== "dec" && hasOperation && !reachedLength) {
            firstNum = Number(display);

            display = display.slice(0, -1);
            display += String(opButton.dataset.value);
            displayText.innerHTML = display;
            displayChange();

            decimal = false;
            lastInput = "op";
            operation = opButton.dataset.value;
        }
    })
})

eqButton.addEventListener('click', function() {
    if (lastInput !== "op" && lastInput !== "dec" && hasOperation) {
        const numSep = display.split(`${operation}`);
        
        secondNum = Number(numSep[1]);
        firstNum = Number(numSep[0])
        operate(Number(firstNum), Number(secondNum), operation);
    }
})

function operate(fir, sec, ope) {
    switch(ope) {
        case "+":
            result = fir + sec;
            displayResult();
            break;
        case "-":
            result = fir - sec;
            displayResult();
            break;
        case "*":
            result = fir * sec;
            displayResult();
            break;
        case "/":
            if (sec != '0') {
                result = fir / sec;
                displayResult();
                break;
            } else {
                resetCalc("Math Error!");
                break;
            }
        case "":
            result = fir;
            displayResult();
            break;
    }
    display = String(result);
    displayText.innerHTML = display;
    displayChange();

    firstNum = String(result);
    secondNum = 0;
    result = 0;
    hasOperation = false;
    lastInput = "num";
    operation = "";

    if (firstNum.includes(".")) {
        decimal = true;
    } else {
        decimal = false;
    }
}

function displayResult() {
    result = (Math.round((result + Number.EPSILON) * 100) / 100);

    let appResult = ((!Number.isInteger(result)) ? result.toFixed(2) : (result.toString().length >= 10) ? result.toExponential(2) : result);

    if (String(appResult).includes("e")) {
        resultText.innerHTML = "≈ " + appResult;
    } else {
        resultText.innerHTML = "= " + appResult;
    }

}

acButton.addEventListener("click", () => { resetCalc(" ")});

function resetCalc(text) {
    resultText.innerHTML = text;

    firstNum = 0;
    secondNum = 0;
    result = 0;
    hasOperation = false;
    decimal = false;
    lastInput = "num";
    operation = "";

    display = "";
    displayText.innerHTML = "";
}

cButton.addEventListener("click", function() {
    let slice = display.slice(-1)

    if (typeof slice === "number") {
        display = display.slice(0, -1);
        displayText.innerHTML = display;
        displayChange();
    } else if (slice === ".") {
        display = display.slice(0, -1);
        displayText.innerHTML = display;
        displayChange();
        lastInput = "num";

        decimal = false;
    } else {
        display = display.slice(0, -1);
        displayText.innerHTML = display;
        displayChange();
        lastInput = "num";

        hasOperation = false;
    } 
})

function displayChange() {
    if (display.length > 20) {
        reachedLength = true;
    } else {
        reachedLength = false;
    }
}

document.addEventListener("keydown", function(e) {
    let key;

    if (e.key == "/") {
        e.preventDefault();
    }

    if (e.key == Number(e.key)) {
        key = Number(e.key);
    } else {
        key = e.key
    }

    if (typeof key == "number") {
        document.querySelector(`#num${key}`).click()
    } else {
        switch (key) {
            case "Backspace":
                cButton.click();
                break;
            case "=":
            case "Enter":
                eqButton.click();
                break;
            case "+":
                plusButton.click();
                break;
            case "-":
                subButton.click();
                break;
            case "*":
                multButton.click();
                break;
            case "/":
                divButton.click();
                break;
            case ".":
            case ",":
                decButton.click();
                break;
        }
    }
})