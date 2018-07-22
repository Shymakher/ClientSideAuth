import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE} from "./types";

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {

  return function (dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(response => {
        //  If request id good...
        //  - Update state to indicate user is authenticated
        dispatch({type: AUTH_USER});
        //  - Save the jwt token
        localStorage.setItem("token", response.data.token);
        //  - Redirect to the route '/feature'
        browserHistory.push('/features');
      })
      .catch(() => {
        //  If request is bad...
        //  - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({email, password}) {
  console.log("signupUser", "email", email, "password", password);
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(resp => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', resp.data.token);
        browserHistory.push('/features');
      })
      .catch(resp => {
        console.log("singupUser", resp);
        dispatch({
          type: AUTH_ERROR,
          payload: resp.data.error}
        );
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {
  return function (dispatch) {
    axios.get(ROOT_URL, {
      headers: {authorization: localStorage.getItem('token')}
    })
      .then(resp => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: resp.data.message
        });
      })
  }
}