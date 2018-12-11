const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateProfileInput = (data) => {
    let errors = {};
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    //Validation for handle field
    if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "Handle length must be from 2 to 40 characters."
    }
    if (validator.isEmpty(data.handle)) {
        errors.handle = "Handle field is required."
    }
    //Validation for Status
    if (validator.isEmpty(data.status)) {
        errors.status = "Status field is required."
    }
    //Validation for skills field
    if (validator.isEmpty(data.skills)) {
        errors.skills = "Skills field is required."
    }

    //Check webiste url validation if not empty 
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website = 'This url is not a vaild url';
        }
    }
    //Check social website url validation if not empty 
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = 'This youtube url is not a vaild url';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = 'This facebook url is not a vaild url';
        }
    }
    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = 'This linkedin url is not a vaild url';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = 'This twitter url is not a vaild url';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = 'This instagram url is not a vaild url';
        }
    }


    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}