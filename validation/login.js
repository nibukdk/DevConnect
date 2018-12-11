const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateLoginInput = (data) => {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //Validation for Email Field
    // if (!validator.isEmail(data.email)) {
    //     errors.email = 'Email is invalid';
    // } 

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

   
    // Validation for Password Field
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
   

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}