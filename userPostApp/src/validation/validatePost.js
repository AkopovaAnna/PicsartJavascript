const validator = require('validator');
const validText = require('./validText');

const validatePost = (data) => {
    let errors = {};

    data.title = validText(data.title) ? data.title : '';
    data.description = validText(data.description) ? data.description : '';

    if (validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }
    if (validator.isEmpty(data.description)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
}

module.exports = validatePost;