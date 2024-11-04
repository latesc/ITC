/*
    https://daigler20.addu.edu.ph/mod/assign/view.php?id=158121

    1. Fahrenheit to Celsius
    2. Celsius to Fahrenheit
    3. Meters to Feet
    4. Feet to Meters
*/

let calculation_form = document.getElementById("calc");
let radios = document.querySelectorAll('input[type=radio][name="operation"]');

let input = calculation_form.querySelector("#input");
let output = calculation_form.querySelector("#output");
let operation = "fahToCel";

let form_label = calculation_form.querySelector("h2");
let input_label = calculation_form.querySelector("label[for='input'");
let output_label = calculation_form.querySelector("label[for='output'");

function changeHandler(event) {
    switch (this.value) {
        case "fahToCel":
            operation = "fahToCel";
            form_label.innerHTML = "Fahrenheit to Celsius";
            input_label.innerHTML = "Fahrenheit";
            output_label.innerHTML = "Celcius";
            break;
        case "celToFah":
            operation = "celToFah";
            form_label.innerHTML = "Celcius to Fahrenheit";
            input_label.innerHTML = "Celcius";
            output_label.innerHTML = "Fahrenheit";
            break;
        case "mtrToFt":
            operation = "mtrToFt";
            form_label.innerHTML = "Meters to Feet";
            input_label.innerHTML = "Meters";
            output_label.innerHTML = "Feet";
            break;
        case "ftToMtr":
            operation = "ftToMtr";
            form_label.innerHTML = "Feet to Meters";
            input_label.innerHTML = "Feet";
            output_label.innerHTML = "Meters";
            break;
    }
}

Array.prototype.forEach.call(radios, function (radio) {
    radio.addEventListener("change", changeHandler);
});

calculation_form.addEventListener("submit", function (event) {
    event.preventDefault();
    let calc_value;

    if (operation === "fahToCel") {
        calc_value = ((input.value - 32) * 5) / 9;
        calc_value = calc_value.toFixed(1);
    } else if (operation === "celToFah") {
        calc_value = (input.value * 9) / 5 + 32;
        calc_value = calc_value.toFixed(1);
    } else if (operation === "mtrToFt") {
        calc_value = input.value * 3.28084;
        calc_value = calc_value.toFixed(2);
    } else if (operation === "ftToMtr") {
        calc_value = input.value / 3.28084;
        calc_value = calc_value.toFixed(2);
    }

    output.innerHTML = calc_value;
});
