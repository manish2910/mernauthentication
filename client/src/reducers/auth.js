import {
    SIGNUP_SUCCESS,
    USER_LOADED,
    SIGNIN_SUCCESS,
    SIGNOUT
  } from '../action/types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          user: payload
        };
      case SIGNUP_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true
        };
      case SIGNIN_SUCCESS:
        return {
          ...state,
          ...payload,
          isAuthenticated: true
        };
      case SIGNOUT:
        return {
          ...state,
          token: null,
          isAuthenticated: false,
          user: null
        };
      default:
        return state;
    }
  }
  