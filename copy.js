document.getElementById('contact-form').addEventListener('submit', function (e) {
    // Prevent the form from submitting/refreshing the page
    e.preventDefault();

    let isFormValid = true;

    // 1. Helper function to show/hide errors
    function setValidationState(element, isValid) {
        const formControl = element.closest('.form-control');
        if(isValid) {
            formControl.classList.remove('error');
            element.setAttribute('aria-invalid', 'false');
        } else {
            formControl.classList.add('error');
            element.setAttribute('aria-invalid', 'true');
            isFormValid = false;
        }
    }

    // 2. Validate Text Fields (First Name, Last Name, Message)
    const textInputs = ['fname', 'lname', 'message'];
    textInputs.forEach(id => {
        const input = document.getElementById(id);
        const isValid = input.value.trim() !== '';
        setValidationState(input, isValid);
    });

    // 3. Validate Email Address
    const emailInput = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(emailInput.value.trim());
    setValidationState(emailInput, isEmailValid);

    // 4. Validate Radio Groups (Query Type)
    const radioSelected = document.querySelector('input[name="query-type"]:checked');
    const queryTypeContainer = document.getElementById('general-enquiry');
    setValidationState(queryTypeContainer, radioSelected !== null); 

    // 5. Validate Consent Checkbox
    const consentCheckbox = document.getElementById('consent-check');
    setValidationState(consentCheckbox, consentCheckbox.checked);

    // 6. Error Focus Management
    if(!isFormValid) {
        const firstInvalidInput = document.querySelector('.form-control.error input, .form-control.error textarea');
        if(firstInvalidInput) {
            firstInvalidInput.focus();
        }
    }

    // 7. Final Decision
    if(isFormValid) {
        alert('Form submitted succesfully!');
        // document.getElementById('contact-form').submit();
    }
});