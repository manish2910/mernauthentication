import api from '../utils/api';
import {
  SIGNUP_SUCCESS,
  USER_LOADED,
  SIGNIN_SUCCESS,
  SIGNOUT
} from './types';

// Load User
export const loadUser = () => async dispatch => {
  try {
    const res = await api.get('/user');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

export const signup = formData => async dispatch => {
  try {
    const res = await api.post('/signup', formData);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }
  }
};

export const signin = (email, password) => async dispatch => {
  const body = { email, password };

  try {
    const res = await api.post('/signin', body);

    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }
  }
};

export const signout = () => ({ type: SIGNOUT });
