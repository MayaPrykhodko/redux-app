
  const validateSignUp = (values) => {
    const errors = {};
    const regexName = /^[A-Za-z]+$/i;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
   

    if (!values['full-name']) {
        errors['full-name'] = "Full name is required!";
      } else if (!regexName.test(values['full-name'])) {
        errors['full-name'] = "Full name includes only letters without spaces!";
      }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 3 || values.password.length > 20) {
      errors.password = "Password must be more than 3 characters and less than 20 characters";
    }
    return errors;
  }
  export default validateSignUp;