const validateEmail = (email) => {
    const errors = [];
    if (typeof email !== 'string' || email.trim().length === 0) {
        errors.push("Email is required.");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Invalid email format.");
        }
    }
    return errors;
};

const validatePassword = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()]/.test(password); // Add or remove special characters as needed

    let errors = [];

    if (!password || password.length === 0) {
        errors.push("Password is required.");
    } else {
        if (password.length < minLength) {
            errors.push("Password must be at least " + minLength + " characters long.");
        }
        if (!hasUppercase) {
            errors.push("Password must contain at least one uppercase letter.");
        }
        if (!hasLowercase) {
            errors.push("Password must contain at least one lowercase letter.");
        }
        if (!hasNumber) {
            errors.push("Password must contain at least one number.");
        }
        if (!hasSpecialChar) {
            errors.push("Password must contain at least one special character.");
        }
    }

    return errors;
}


export {validateEmail,validatePassword}