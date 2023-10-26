/* eslint-disable no-useless-catch */
import {
  FETCH_USER,
  FETCH_JOB,
  FETCH_JOB_LOADING,
  FETCH_COMPANY,
  FETCH_COMPANY_BY_ID,
  FETCH_USER_LOADING,
  FETCH_COMPANY_LOADING,
} from "./actionType";
const BASE_URL = "http://localhost:3000";
// const BASE_URL = "https://joblink.nicodemust.my.id";

export function login(payload) {
  return async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const responseJSON = await response.json();
      if (responseJSON.data) {
        localStorage.setItem("access_token", responseJSON.data.access_token);
        localStorage.setItem("username", responseJSON.data.user.username);
        localStorage.setItem("role", responseJSON.data.user.role);
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export function register(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });
      const responseJSON = await response.json();

      if (response?.ok) {
        dispatch(fetchUsers());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function fetchUsers() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_USER_LOADING,
        payload: true,
      });

      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch({
        type: FETCH_USER,
        payload: responseJSON,
      });
    } catch (error) {
      throw error;
    } finally {
      dispatch({
        type: FETCH_USER_LOADING,
        payload: false,
      });
    }
  };
}

export function fetchJobs() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_JOB_LOADING,
        payload: true,
      });

      const response = await fetch(`${BASE_URL}/job`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
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

export function fetchCompanies() {
  return async (dispatch) => {
    try {
      dispatch({
        type: FETCH_COMPANY_LOADING,
        payload: true,
      });

      const response = await fetch(`${BASE_URL}/company`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch({
        type: FETCH_COMPANY,
        payload: responseJSON,
      });
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({
        type: FETCH_COMPANY_LOADING,
        payload: false,
      });
    }
  };
}

export function fetchCompaniesById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/company/${id}`, {
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();

      dispatch({
        type: FETCH_COMPANY_BY_ID,
        payload: responseJSON,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCompanyById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/company/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      console.log(responseJSON);

      if (response?.ok) {
        dispatch(fetchCompanies());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function addCompany(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/company`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });
      const responseJSON = await response.json();

      if (response?.ok) {
        dispatch(fetchCompanies());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function editCompany(payload, id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/company/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });

      if (response?.ok) {
        console.log("Use the response here!");
      } else {
        console.log(`HTTP Response Code: ${response?.status}`);
      }

      const responseJSON = await response.json();

      if (response?.ok) {
        dispatch(fetchCompanies());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function addJob(payload) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });
      const responseJSON = await response.json();

      if (response?.ok) {
        dispatch(fetchJobs());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function editJob(payload, id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/job/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: localStorage.getItem("access_token"),
        },
        body: JSON.stringify(payload),
      });

      const responseJSON = await response.json();
      if (response?.ok) {
        dispatch(fetchJobs());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}

export function deleteJobById(id) {
  return async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/job/${id}`, {
        method: "DELETE",
        headers: {
          access_token: localStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      if (response?.ok) {
        dispatch(fetchJobs());
        return responseJSON.message;
      } else {
        throw responseJSON.message;
      }
    } catch (error) {
      throw error;
    }
  };
}
