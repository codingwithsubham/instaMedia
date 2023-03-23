import axios from "axios";
import {
  LOGIN_SUCCESS,
  USER_LOADED,
  //AUTH_ERROR,
  LOGOUT,
  //SETTINGS_LOADED,
  SETTINGS_LOADING_ERROR,
  LOGIN_FAIL,
  RESET_ERROR,
  REGISTER_SUCCESS,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";
const { API_CONFIG } = require("../common/constants");

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth/load-user", API_CONFIG);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // dispatch({
    //   type: AUTH_ERROR,
    //   payload: err,
    // });
  }
};

// Update App Global Settings
export const register = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/register", body, API_CONFIG);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: SETTINGS_LOADING_ERROR,
    });
  }
};

//Verify OTP and Login
export const login = (body) => async (dispatch) => {
  try {
    dispatch({
      type: RESET_ERROR,
    });
    const res = await axios.post("/api/auth/login", body, API_CONFIG);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Welcome Back", "success"));
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({
      type: LOGIN_FAIL,
      payload: errors,
    });
  }
};

//Logout
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

// update Bank
export const updateUserBank = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/update-user/bank", body, API_CONFIG);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: SETTINGS_LOADING_ERROR,
    });
  }
};

