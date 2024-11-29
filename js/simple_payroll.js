/*
Write a Javascript Program to Add,Delete employees in a payroll list.
1. The payroll program should input the following:
Employee Name         Days Worked          Daily Rate      Deduction Amount
2. During Addition, the program should display the following in a table:
No.    Employee Name      Days Worked      Daily Rate      Gross Pay     Deduction Amount    Net Pay

where:
    No. = is the Payroll List Line number
    Gross Pay = Days Worked * Daily Rate
    Net Pay = Gross Pay - Deduction Amount

3. During Deletion, the program should ask for the Line Number to delete and update the table
*/

let add_form = document.getElementById("payroll_add_form");
let remove_form = document.getElementById("payroll_remove_form");
let table = document.getElementById("payroll_table");

let remove_employee = document.getElementById("remove_employee");
let clear_payroll = document.getElementById("clear_payroll");

let employeeName = document.getElementById("employee_name");
let daysWorked = document.getElementById("days_worked");
let dailyRate = document.getElementById("daily_rate");
let deductionAmount = document.getElementById("deduction_amount");

// Get the modal
let add_modal = document.getElementById("addEmployeeModal");
let remove_modal = document.getElementById("removeEmployeeModal");

// Get the button that opens the modal
let add_btn = document.getElementById("addEmployeeBtn");
let remove_btn = document.getElementById("removeEmployeeBtn");

let generate_employee = document.getElementById("generate_employee");
let closeBtn = document.getElementsByClassName("close_btn");

class Employee {
    constructor(name, daysWorked, dailyRate, deductionAmount) {
        this.name = name;
        this.daysWorked = parseFloat(daysWorked);
        this.dailyRate = parseFloat(dailyRate);
        this.deductionAmount = parseFloat(deductionAmount);
    }

    getGrossPay() {
        return this.daysWorked * this.dailyRate;
    }

    getNetPay() {
        return this.getGrossPay() - this.deductionAmount;
    }
}

class Payroll {
    constructor() {
        this.employees = [];
    }

    addEmployee(employee) {
        this.employees.push(employee);
        this.showEmployees();
    }

    deleteEmployee(index) {
        if (index > 0 && index <= this.employees.length) {
            this.employees.splice(index - 1, 1);
            this.showEmployees();
        } else {
            alert("Invalid line number");
        }
    }

    getEmployees() {
        return this.employees;
    }

    showEmployees() {
        let employee_table = document.createDocumentFragment();

        this.employees.forEach((employee, index) => {
            const row = document.createElement("tr");

            const cellNo = document.createElement("td");
            cellNo.textContent = index + 1;
            row.appendChild(cellNo);

            const cellName = document.createElement("td");
            cellName.textContent = employee.name;
            row.appendChild(cellName);

            const cellDaysWorked = document.createElement("td");
            cellDaysWorked.textContent = employee.daysWorked;
            row.appendChild(cellDaysWorked);

            const cellDailyRate = document.createElement("td");
            cellDailyRate.textContent = employee.dailyRate;
            row.appendChild(cellDailyRate);

            const cellGrossPay = document.createElement("td");
            cellGrossPay.textContent = employee.getGrossPay();
            row.appendChild(cellGrossPay);

            const cellDeductionAmount = document.createElement("td");
            cellDeductionAmount.textContent = employee.deductionAmount;
            row.appendChild(cellDeductionAmount);

            const cellNetPay = document.createElement("td");
            cellNetPay.textContent = employee.getNetPay();
            row.appendChild(cellNetPay);

            employee_table.appendChild(row);
        });

        // Replace existing table body with the new rows
        const tableBody = table.querySelector("tbody");
        tableBody.replaceChildren(employee_table);
    }

    clearPayroll() {
        this.employees = [];
        this.showEmployees();
    }
}

let payroll = new Payroll();

add_form.addEventListener("submit", (event) => {
    event.preventDefault();

    let employee = new Employee(
        employeeName.value,
        daysWorked.value,
        dailyRate.value,
        deductionAmount.value,
    );

    payroll.addEmployee(employee);
    add_modal.close();
});

generate_employee.onclick = function () {
    let employee = new Employee(
        "Employee " + Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
        Math.floor(Math.random() * 100),
    );

    payroll.addEmployee(employee);
    add_modal.close();
};

remove_form.addEventListener("submit", (event) => {
    event.preventDefault();
    payroll.deleteEmployee(remove_form.querySelector("input").value);
    remove_modal.close();
});

remove_employee.addEventListener("click", (event) => {
    event.preventDefault();
    payroll.deleteEmployee(remove_form.querySelector("input").value);
    remove_modal.close();
});

add_btn.onclick = function () {
    add_modal.showModal();
};

remove_btn.onclick = function () {
    remove_modal.showModal();
};

for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function () {
        add_modal.close();
        remove_modal.close();
    };
}

window.onclick = function (event) {
    if (event.target == add_modal || event.target == remove_modal) {
        add_modal.close();
        remove_modal.close();
    }
};

clear_payroll.addEventListener("click", (event) => {
    event.preventDefault();
    payroll.clearPayroll();
    remove_modal.close();
});
