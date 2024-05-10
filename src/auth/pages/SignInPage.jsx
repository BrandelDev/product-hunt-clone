import React, { useContext } from 'react';
import { AuthContext } from "../context";
import { Link } from 'react-router-dom';
import { useForm } from '../../product-hunt/hooks';
import { useNavigate } from "react-router-dom"

const initForm = {
  email: '',
  password: ''
}

const SignInPage = () => {
  const { login, loginGoogle, errorMessage } = useContext(AuthContext);
  const { onInputChange, email, password, isFormValid } = useForm(initForm);
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(email)

    if (isFormValid) {
      const isValidLogin = await login(email, password);
      if (isValidLogin) {
        const lastPath = localStorage.getItem('lastPath') || '/user-view'
        navigate(lastPath, { replace: true });
      }
    }
  }

  const onGoogleLogin = async (event) => {
    event.preventDefault();

    if (isFormValid) {
      const isValidLogin = await loginGoogle();
      if (isValidLogin) {
        const lastPath = localStorage.getItem('lastPath') || '/user-view'
        navigate(lastPath, { replace: true });
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Sign In</h2>
              <form onSubmit={onLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={email}
                    onChange={onInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={password}
                    onChange={onInputChange}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary" disabled={!isFormValid}>Sign In</button> OR &nbsp;
                  <Link to="/register"><label className='form-label'>  Create an account</label></Link>
                  <br />
                  {!errorMessage ? null :
                    <div
                      className="alert alert-danger"
                      role="alert"
                    >
                      {errorMessage}
                    </div>
                  }
                </div>
                <div className='text-center py-3'>
                  <button className="btn btn-primary" onClick={onGoogleLogin}>Sign In with Google</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;