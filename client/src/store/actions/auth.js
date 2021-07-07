import axios from '../../utils/axios';
import history from '../../utils/history';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const register = registerData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const res = await axios.post('/auth/register', registerData);
    const token = res.data.data;
    saveTokenToLocalStorage(token);
    const user = await getCurrentUser();
    dispatch({ type: REGISTER, payload: user });
    history.push('/');
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_AUTH_ERROR, payload: errorMessage });
  }
};

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const res = await axios.post('/auth/login', loginData);
    const token = res.data.data;
    saveTokenToLocalStorage(token);
    const user = await getCurrentUser();
    dispatch({ type: LOGIN, payload: user });
    history.push('/');
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_AUTH_ERROR, payload: errorMessage });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const user = await getCurrentUser();
    if (user) {
      dispatch({ type: AUTHENTICATE, payload: user });
    } else {
      dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
    }
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
  }
};

export const logout = () => dispatch => {
  removeTokenFromLocalStorage();
  dispatch({ type: LOGOUT });
  history.push('/login');
};

export const deleteAccount = password => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    await axios.delete('/auth/delete', {
      data: { password },
    });
    removeTokenFromLocalStorage();
    dispatch({ type: DELETE_ACCOUNT });
    history.push('/register');
  } catch (error) {
    const errors = error.response.data.errors;
    let errorMessage = 'Something went wrong!';
    if (errors) {
      errorMessage = errors[0];
    }
    dispatch({ type: SET_AUTH_ERROR, payload: errorMessage });
  }
};

export const setAuthError = message => dispatch => {
  dispatch({ type: SET_AUTH_ERROR, payload: message });
};

const getCurrentUser = async () => {
  try {
    const res = await axios.get('/auth/current-user');
    const user = res.data.data;
    return user;
  } catch (error) {
    return null;
  }
};

const saveTokenToLocalStorage = token => {
  localStorage.setItem('express-token', token);
};

export const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem('express-token');
  return token;
};

const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('express-token');
};
