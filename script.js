document.getElementById('calculator-form').addEventListener('submit', function (e) {
    e.preventDefault();

    let isFormValid = true;

    function setValidationState(element, isValid) {
        const formContainer = element.closest('.form-container');
        if (isValid) {
            formContainer.classList.remove('error');
            element.setAttribute('aria-invalid', 'false');
        } else {
            formContainer.classList.add('error');
            element.setAttribute('aria-invalid', 'true');
            isFormValid = false;
        }
    }

    // Validate Day Input
    const dayElement = document.getElementById('day');
    const dayInput = dayElement.value.trim();
    const dayNum = Number(dayInput);
    const dayErrorMsg = document.querySelector('.day-error');
    let isDayValid = true;

    if (dayInput === '') {
        dayErrorMsg.textContent = 'This field is required';
        isDayValid = false;
    } else if (Number.isNaN(dayNum) || !Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
        dayErrorMsg.textContent = 'Must be a valid day';
        isDayValid = false;
    }

    // Validate Month Input
    const monthElement = document.getElementById('month');
    const monthInput = monthElement.value.trim();
    const monthNum = Number(monthInput);
    const monthErrorMsg = document.querySelector('.month-error');
    let isMonthValid = true;

    if (monthInput === '') {
        monthErrorMsg.textContent = 'This field is required';
        isMonthValid = false; 
    } else if (Number.isNaN(monthNum) || !Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
        monthErrorMsg.textContent = 'Must be a valid month';
        isMonthValid = false;
    }

    // Validate Year Input
    const yearElement = document.getElementById('year');
    const yearInput = yearElement.value.trim();
    const yearNum = Number(yearInput);
    const yearErrorMsg = document.querySelector('.year-error');
    let isYearValid = true;

    const currentYear = new Date().getFullYear();

    if (yearInput === '') {
        yearErrorMsg.textContent = 'This field is required';
        isYearValid = false; 
    } else if (Number.isNaN(yearNum) || !Number.isInteger(yearNum) || yearNum < 1000) {
        yearErrorMsg.textContent = 'Must be a valid year';
        isYearValid = false;
    } else if (yearNum > currentYear) {
        yearErrorMsg.textContent = 'Must be in the past';
        isYearValid = false;
    }

    // Individual field validation
    setValidationState(dayElement, isDayValid);
    setValidationState(monthElement, isMonthValid);
    setValidationState(yearElement, isYearValid);

    // Combined Date Validation
    if (isDayValid && isMonthValid && isYearValid) {
        const inputDate = new Date(yearNum, monthNum - 1, dayNum);
        const today = new Date();

        // Check if day matches JS Date roll-over (e.g., Apr 31 becomes May 1)
        const isRealDate =
            inputDate.getFullYear() === yearNum &&
            inputDate.getMonth() === monthNum - 1 &&
            inputDate.getDate() === dayNum;
        
        if (!isRealDate) {
            dayErrorMsg.textContent = 'Must be a valid date';
            setValidationState(dayElement, false);
            setValidationState(monthElement, false);
            setValidationState(yearElement, false);
        } else if (inputDate > today) {
            yearErrorMsg.textContent = 'Must be in the past';
            setValidationState(yearElement, false);
        }
    }

    // Calculate and Display Age if form is valid
    if (isFormValid) {
        calculateAge(dayNum, monthNum, yearNum);
    }
});

function calculateAge(day, month, year) {
    const today = new Date();
    let curDay = today.getDate();
    let curMonth = today.getMonth() + 1;
    let curYear = today.getFullYear();

    // Borrow days from previous month if necessary
    if (curDay < day) {
        const daysInPrevMonth = new Date(curYear, curMonth - 1, 0).getDate();
        curDay += daysInPrevMonth;
        curMonth -= 1;
    }

    // Borrow months from previous year if necessary
    if (curMonth < month) {
        curMonth += 12;
        curYear -= 1;
    }

    const calcDays = curDay - day;
    const calcMonths = curMonth - month;
    const calcYears = curYear - year;

    // Output to HTML
    const outputs = document.querySelectorAll('.output-text');
    outputs[0].textContent = calcYears;
    outputs[1].textContent = calcMonths;
    outputs[2].textContent = calcDays;
}