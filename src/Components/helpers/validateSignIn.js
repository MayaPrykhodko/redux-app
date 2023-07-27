
  const validateSignIn = (values) => {
    const errors = {};
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 3 || values.password.length > 20) {
      errors.password = "Password must be more than 3 characters and less than 20 characters";
    }
    return errors;
  }
  export default validateSignIn;