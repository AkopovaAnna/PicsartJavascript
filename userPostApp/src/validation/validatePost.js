const validator = require('validator');
const validText = require('./validText');

exports.validatePost = (data) => {
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
        errors: JSON.stringify(errors),
        isValid: Object.keys(errors).length === 0
    };
}
