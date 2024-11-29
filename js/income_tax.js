/* 

Input the Taxable Income and Compute the income tax using the following table:

*Note: Do not use prompts for user inputs. Use the HTML input tag.

Income Tax = Basic tax + Rate

Amount of Net 
Taxable Income	        Basic Tax + Rate	
Over        But Not Over	 	
-	        250,000	    0%	
P250,000	400,000	    20% of the excess over P250,000	
P400,000	800,000	    P30,000 + 25% of the excess over P400,000	
P800,000	2,000,000	P130,000 + 30% of the excess over P800,000	
P2,000,000	8,000,000	P490,000 + 32% of the excess over P2,000,000	
P8,000,000  -           P2,410,000 + 35% of the excess over P8,000,000	
*/

/* Example
Taxable Income	Income Tax
180,000.00	    0.00
320,000.00	    14,000.00
520,000.00	    60,000.00
930,000.00	    169,000.00
2,400,000.00	618,000.00
10,000,000.00	3,110,000.00
*/

let form = document.getElementById("calc_form"),
    input = form.querySelector("#input"),
    output = form.querySelector("#output");

const tax_brackets = [
    { lower: 0, upper: 250000, base: 0, rate: 0 },
    { lower: 250000, upper: 400000, base: 250000, rate: 0.2 },
    { lower: 400000, upper: 800000, base: 400000, rate: 0.25 },
    { lower: 800000, upper: 2000000, base: 800000, rate: 0.3 },
    { lower: 2000000, upper: 8000000, base: 2000000, rate: 0.32 },
    {
        lower: 8000000,
        upper: Number.MAX_SAFE_INTEGER,
        base: 8000000,
        rate: 0.35,
    },
];

// Binary Search
function getTaxBracket(income) {
    let low = 0,
        high = tax_brackets.length - 1;

    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const bracket = tax_brackets[mid];

        if (income > bracket.lower && income <= bracket.upper) {
            console.log("True", bracket);
            return bracket;
        }

        if (income <= bracket.lower) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return null;
}

function computeTax(income) {
    const bracket = getTaxBracket(income);

    if (bracket === null) {
        return null;
    }

    const { base, rate } = bracket;
    console.log(base, rate);

    return (income - base) * rate;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let income = parseFloat(input.value);
    let tax = computeTax(income);
    console.log(tax);

    if (tax === null) {
        return;
    }

    output.innerHTML = tax.toFixed(2);
});
