import React from 'react';
import { useState } from 'react';
import Header from '../Blocks/Header';
import Footer from '../Blocks/Footer';
import '../../styles/SignPages.scss';
import paths from '../../enums/paths';
import validateSignIn from '../helpers/validateSignIn';
import { useSelector, useDispatch } from 'react-redux';
import { userLogin } from '../../actions/userLogin';
import Loader from '../Blocks/Loader';
import { useNavigate } from 'react-router-dom';



export default function SignIn() {
  const loading = useSelector((state) => state.user.loading)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
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
    setFormErrors(validateSignIn(formValues));
    setIsSubmit(true);

    const errors = validateSignIn(formValues);
    if (Object.keys(errors).length === 0) {
      const loginResponse = await dispatch(userLogin({ email: formValues.email, password: formValues.password }));
     
      if (loginResponse.meta.requestStatus === 'fulfilled') {
        navigate(paths.MAIN);
      }
    }

  }

  return (
    <>
      <Header display="none" />
      <main className="sign-in-page">
        <h1 className="visually-hidden">Travel App</h1>
        <form className="sign-in-form" autoComplete="off" onSubmit={handleSubmit}>
          <h2 className="sign-in-form__title">Sign In</h2>
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
          </label>  {loading ? <Loader /> : (<>
            <button data-test-id="auth-submit" className="button" type="submit">
              Sign In
            </button> </>)}
        </form>
        <span>
          Don't have an account?
          <a
            data-test-id="auth-sign-up-link"
            href={paths.SIGN_UP}
            className="sign-in-form__link"
          >
            Sign Up
          </a>
        </span>
      </main>
      <Footer />

    </>
  );
}