import {
  CONTENT_UPLOADED,
  GET_CONTENT,
  GET_CATEGORIES,
  GET_SHORTS,
} from "../actions/types";

const initialState = {
  contents: [],
  categories: [],
  shorts: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONTENT_UPLOADED:
      return {
        ...state,
        contents: [...state.contents, payload],
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    case GET_SHORTS:
      return {
        ...state,
        shorts: payload,
      };
    case GET_CONTENT:
      return {
        ...state,
        contents: payload,
      };
    default:
      return state;
  }
}
