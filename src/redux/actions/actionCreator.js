import {SET_LATEST_NEWS, SET_POPULAR_NEWS, GET_NEWS, SET_POPULAR_NEWS_ERROR, SET_LATEST_NEWS_ERROR} from "../constants";


export const setLatestNewsAction = (payload) => ({
  type: SET_LATEST_NEWS,
  payload,
});

export const setPopularNewsAction = (payload) => ({
  type: SET_POPULAR_NEWS,
  payload,
});

export const setPopularNewsErrorAction = () => ({
  type: SET_POPULAR_NEWS_ERROR,
  payload: 'fetching popular news error',
});

export const setLatestNewsErrorAction = () => ({
  type: SET_LATEST_NEWS_ERROR,
  payload: 'fetching latest news error',
});

export const getNewsAction = () => ({
  type: GET_NEWS,
});

