import axios from "axios";
import { CONTENT_UPLOADED, GET_CATEGORIES, GET_CONTENT } from "./types";
import { setAlert } from "./alert";
const { API_CONFIG } = require("../common/constants");

// Upload Content
export const uploadContent = (body) => async (dispatch) => {
  try {
    const res = await axios.post("/api/content/save-content", body, API_CONFIG);
    dispatch({
      type: CONTENT_UPLOADED,
      payload: res.data,
    });
    dispatch(setAlert("Content Uploaded !!", "success"));
  } catch (err) {
    dispatch(setAlert("Content Upload Fail !!", "fail"));
  }
};

// get Content
export const getContent = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/content/get-contents", API_CONFIG);
    dispatch({
      type: GET_CONTENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Content Get Fail !!", "fail"));
  }
};

// get categories
export const getCategories = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/content/get-categories", API_CONFIG);
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data,
    });
  } catch (err) {
    dispatch(setAlert("Pulling Category Fail !!", "fail"));
  }
};
