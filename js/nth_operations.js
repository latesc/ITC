let calculation_form = document.getElementById("calc");
let radios = document.querySelectorAll('input[type=radio][name="operation"]');

let input = calculation_form.querySelector("#input");
let output = calculation_form.querySelector("#output");
let operation = "factorial";

let form_label = calculation_form.querySelector("h2");
let input_label = calculation_form.querySelector("label[for='input'");
let output_label = calculation_form.querySelector("label[for='output'");

function changeHandler(event) {
    switch (this.value) {
        case "factorial":
            operation = "factorial";
            form_label.innerHTML = "nth Factorial";
            break;
        case "sum":
            operation = "sum";
            form_label.innerHTML = "Sum of First n Numbers";
            break;
        case "average":
            operation = "average";
            form_label.innerHTML = "Average of First n Numbers";
            break;
    }
}

Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener("change", changeHandler);
});

calculation_form.addEventListener("submit", function (event) {
    event.preventDefault();
    let calc_value;

    switch (operation) {
        case "factorial":
            calc_value = nFactorial(input.value);
            break;
        case "sum":
            calc_value = nSum(input.value);
            break;
        case "average":
            calc_value = nAverage(input.value);
            break;
    }

    output.innerHTML = calc_value;
});

// Factorial using While Loop
function nFactorial(n) {
    let result = 1;
    while (n > 1) {
        result *= n;
        n--;
    }
    return result;
}

// Sum of first n using Do While Loop
function nSum(n) {
    let result = 0;
    let count = 1;

    do {
        result += count;
        count++;
    } while (count <= n);

    return result;
}

// Average of first n using For Loop
function nAverage(n) {
    let result = 0;
    for (let count = 1; count <= n; count++) {
        result += count;
    }
    return result / n;
}
