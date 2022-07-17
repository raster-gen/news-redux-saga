import {SET_LATEST_NEWS_ERROR, SET_POPULAR_NEWS_ERROR} from "../constants";

const initialState = {
  latestNewsError: '',
  popularNewsError: '',
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LATEST_NEWS_ERROR:
      return {...state, latestNewsError: action.payload};

    case SET_POPULAR_NEWS_ERROR:
      return {...state, popularNewsError: action.payload};

    default:
      return state;
  }
};