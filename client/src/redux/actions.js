import axios from "axios";
import {
  GET_VIDEOGAMES,
  GET_GAME_DETAIL,
  GET_GENRES,
  GET_VIDEOGAMES_NAME,
  SORT_VIDEOGAMES,
  ORDER_BY,
  ORDER_BY_R,
  SORT_GENRE,
  CLEAR,
} from "./actionTypes";

export function getAllVideogames() {
  return async function (dispatch) {
    const res = await axios(`http://localhost:3001/videogames`);
    return dispatch({
      type: GET_VIDEOGAMES,
      payload: res.data,
    });
  };
}

export function getGameById(id) {
  return async function (dispatch) {
    try {
      const resp = await axios(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_GAME_DETAIL,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function getVGname(name) {
  return async function (dispatch) {
    try {
      const resp = await axios(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type: GET_VIDEOGAMES_NAME,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getGenres() {
  return async function (dispatch) {
    try {
      const resp = await axios(`http://localhost:3001/genres`);
      dispatch({
        type: GET_GENRES,
        payload: resp.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function sortVG(name) {
  return {
    type: SORT_VIDEOGAMES,
    payload: name,
  };
}
export function clear(payload) {
  return { 
    type:
     CLEAR ,
     payload,
    };
};
export function sortGen(payload) {
  return {
    type: SORT_GENRE,
    payload,
  };
}
export function OrderBy(payload) {
  return {
    type: ORDER_BY,
    payload,
  };
}
export function OrderByR(payload) {
  return {
    type: ORDER_BY_R,
    payload,
  };
}

export function postGame(input) {
  return async function () {
    const resp = await axios.post(`http://localhost:3001/videogame`, input);
    return resp.data;
  };
}
