import React from 'react';
import { useState } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import '../../styles/SignPages.scss';
import paths from '../../enums/paths';
import validateSignUp from '../helpers/validateSignUp';
import { useSelector, useDispatch } from 'react-redux';
import { userRegister } from '../../actions/userRegister';
import Loader from '../Blocks/Loader';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const loading  = useSelector((state) => state.user.registerLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    'full-name': "",
    email: "",
    password: ""
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validateSignUp(formValues));
    setIsSubmit(true);

    const errors = validateSignUp(formValues);
    if (Object.keys(errors).length === 0) {
      const regResponse = await dispatch(userRegister({fullName: formValues['full-name'], email: formValues.email, password: formValues.password}));
      
      if (regResponse.meta.requestStatus === 'fulfilled') {
        navigate(paths.MAIN);
      }
    }
  }

  return (
    <>
      <Header display="none" />
      <main className="sign-up-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-up-form" autoComplete="off" onSubmit={handleSubmit}>
          <h2 className="sign-up-form__title">Sign Up</h2>
          <label className="input">
            <span className="input__heading">Full name</span>
            <p>{isSubmit && formErrors['full-name']}</p>
            <input
              data-test-id="auth-full-name"
              name="full-name"
              type="text"
              required
              onChange={handleChange}
              value={formValues['full-name']}
            />
          </label>
          <label className="input">
            <span className="input__heading">Email</span>
            <p>{isSubmit && formErrors.email}</p>
            <input data-test-id="auth-email" name="email" type="email" required onChange={handleChange} value={formValues.email} />
          </label>
          <label className="input">
            <span className="input__heading">Password</span>
            <p>{isSubmit && formErrors.password}</p>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              onChange={handleChange}
              value={formValues.password}
            />
          </label>
          {loading ? <Loader /> : (
          <button data-test-id="auth-submit" className="button" type="submit">
            Sign Up
          </button>
          )}
        </form>
        <span>
          Already have an account?
          <a
            data-test-id="auth-sign-in-link"
            href={paths.SIGN_IN}
            className="sign-up-form__link"
          >Sign In</a
          >
        </span>
      </main>
      <Footer />
    </>
  );
}