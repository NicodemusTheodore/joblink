/* eslint-disable no-useless-catch */
import { FETCH_JOB, FETCH_JOB_BY_ID, FETCH_JOB_LOADING } from "./actionType";
const BASE_URL = "http://localhost:3000/pub";
// const BASE_URL = "https://joblink.nicodemust.my.id/pub";

export function fetchJobs(search) {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_JOB_LOADING,
        payload: true,
      });

      let url = `${BASE_URL}/jobs`;
      if (search) {
        url += `?title=${search}`;
      }

      const response = await fetch(url);
      const responseJSON = await response.json();
      dispatch({
        type: FETCH_JOB,
        payload: responseJSON,
      });
    } catch (error) {
      throw error;
    } finally {
      dispatch({
        type: FETCH_JOB_LOADING,
        payload: false,
      });
    }
  };
}

export function fetchJobById(id) {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_JOB_LOADING,
        payload: true,
      });
      const response = await fetch(`${BASE_URL}/jobs/${id}`);
      const responseJSON = await response.json();
      dispatch({
        type: FETCH_JOB_BY_ID,
        payload: responseJSON,
      });
    } catch (error) {
      throw error;
    } finally {
      dispatch({
        type: FETCH_JOB_LOADING,
        payload: false,
      });
    }
  };
}
