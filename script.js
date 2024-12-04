let outputScreen = document.getElementById("outputscreen")
let isCalculated = false;

function display(num) {
    if (isCalculated) {
        outputScreen.value = num;
        isCalculated = false;
    }
    else {
        const lastChar = outputScreen.value.slice(-1);
        const operators = ["%", "/", "*", "+", "-"];

        if (operators.includes(lastChar) && operators.includes(num)) {
            return;
        }

        if (outputScreen.value === "0" && num !== "." && !operators.includes(num)) {
            outputScreen.value = num;
        } else {
            outputScreen.value += num;
        }
    }
    scrollToRight();
}

function operator(op) {
    const lastChar = outputScreen.value.slice(-1);
    const operators = ["%", "/", "*", "+", "-", "."];

    if (outputScreen.value === "") {
        return;
    }

    if (isCalculated) {
        outputScreen.value = outputScreen.value + op;
        isCalculated = false;
    }
    else if (operators.includes(lastChar)) {
        outputScreen.value = outputScreen.value.slice(0, -1) + op;
    } else {
        outputScreen.value += op;
    }
    scrollToRight();
}

function Calculate() {
    const operators = ["%", "/", "*", "+", "-"];
    const hasOperator = operators.some(op => outputScreen.value.includes(op));

    if (!hasOperator) {
        return;
    }

    try {
        let result = eval(outputScreen.value);

        if (result % 1 !== 0) {
            result = result.toFixed(2);
        }

        outputScreen.value = result;
        isCalculated = true;
    }

    catch (err) {
        alert("invalid")
    }
    scrollToRight();
}

function Clear() {
    outputScreen.value = "";
    isCalculated = false;
}

function del() {
    if (!isCalculated) {
        outputScreen.value = outputScreen.value.slice(0, -1)
    }
    scrollToRight();
}

function scrollToRight() {
    outputScreen.scrollLeft = outputScreen.scrollWidth;
}