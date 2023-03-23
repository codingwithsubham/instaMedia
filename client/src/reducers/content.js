import { CONTENT_UPLOADED, GET_CONTENT, GET_CATEGORIES } from "../actions/types";

const initialState = {
  contents: [],
  categories: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CONTENT_UPLOADED:
      return {
        ...state,
        contents: [...state.contents.reverse(), payload].reverse(),
      };
    case GET_CATEGORIES:
      return {
        ...state,
        categories: payload.reverse(),
      };
    case GET_CONTENT:
      return {
        ...state,
        contents: payload.reverse(),
      };
    default:
      return state;
  }
}
