import React, { useReducer } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../images/logo.png';
import formReducer from '../utils/formReducer';
import { login } from '../store/actions/auth';

const initialFormData = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useReducer(formReducer, initialFormData);
  const { isLoading, isAuthenticated, error } = useSelector(
    state => state.auth
  );

  const loginHandler = e => {
    e.preventDefault();
    dispatch(login(formData));
  };

  if (!isLoading && isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='d-flex justify-content-center my-5'>
      <div className='card'>
        <div className='card-header text-center px-5'>
          <img src={Logo} alt='' />
        </div>
        <div className='card-body'>
          {error ? (
            <div className='alert alert-danger'>
              <small>{error}</small>
            </div>
          ) : null}
          <form onSubmit={loginHandler}>
            <div className='form-group'>
              <label>Email Address</label>
              <input
                required
                name='email'
                value={formData.email}
                type='email'
                className='form-control'
                onChange={setFormData}
                disabled={isLoading}
              />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input
                required
                name='password'
                value={formData.password}
                type='password'
                className='form-control'
                onChange={setFormData}
                disabled={isLoading}
              />
            </div>
            <button
              type='submit'
              className='btn btn-success btn-block'
              disabled={isLoading}>
              <i className='fas fa-user mr-2'></i>
              Login
            </button>
            <Link to='/register' className='btn btn-primary btn-block'>
              <i className='fas fa-user-plus mr-2'></i>
              Register instead
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
