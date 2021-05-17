const getErrors = (fields, errors) => {
    const errs = fields.map((field) => {
        return errors[field]
            ? { name: field, error: errors[field].message }
            : null;
    }).filter(item => item !== null);
    return errs;
}

module.exports = {
    getErrors
}