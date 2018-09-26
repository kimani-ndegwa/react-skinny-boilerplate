import { LOGIN_ACTIONS, LOGOUT_ACTIONS } from "./actionTypes";

// Helper
import { BACKEND_URL, getItemFromLocalStorage } from "../../common";

/**
 * @param {Object} data
 * Contains the initial data object dispatched to the backend.
 */

const googleLoginRequest = data => {
  return {
    type: LOGIN_ACTIONS.LOGIN_USER_GOOGLE_REQUEST,
    data
  };
};

/**
 * @param {Object} successData
 * Contains the success data after the google login is successful.
 */

const googleLoginSuccess = successData => {
  return {
    type: LOGIN_ACTIONS.LOGIN_USER_GOOGLE_SUCCESS,
    data: successData
  };
};

/**
 * @param {Object} failureData
 * Contains the failure data if the google login fails.
 */

const googleLoginFailure = failureData => {
  return {
    type: LOGIN_ACTIONS.LOGIN_USER_GOOGLE_FAILURE,
    data: failureData
  };
};

/**
 * Log Out Action Creators
 */

const googleLogOutRequest = () => {
  return {
    type: LOGOUT_ACTIONS.LOGOUT_USER_GOOGLE_REQUEST
  };
};

const googleLogOutSuccess = () => {
  return {
    type: LOGOUT_ACTIONS.LOGOUT_USER_GOOGLE_SUCCESS
  };
};

const googleLogOutFailure = () => {
  return {
    type: LOGOUT_ACTIONS.LOGOUT_USER_GOOGLE_FAILURE
  };
};

/**
 * Wrapping requests that calls the above action creators
 * @param {request} Object with the data
 */

export const googleLogin = request => dispatch => {
  dispatch(googleLoginRequest(request));
  const body = new Blob(
    [JSON.stringify({ access_token: request.accessToken }, null, 2)],
    { type: "application/json" }
  );
  fetch(`${BACKEND_URL}/google-login`, {
    method: "POST",
    body,
    mode: "cors",
    cache: "default"
  })
    .then(response => {
      console.log(response, "ERE");
      if (response.ok) {
        const token = request.tokenObj.id_token;
        localStorage.setItem("g_token", JSON.stringify(token));
        localStorage.setItem("gUserInfo", JSON.stringify(request.profileObj));
        return response.json().then(userInfo => {
          localStorage.setItem("gUserId", JSON.stringify(userInfo));
          dispatch(googleLoginSuccess(userInfo));
        });
      }

      throw Error(response);
    })
    .catch(error => {
      dispatch(googleLoginFailure(error));
    });
};

export const googleLogout = () => dispatch => {
  // Remove Token in local storage
  dispatch(googleLogOutRequest());
  const token = getItemFromLocalStorage("g_token");
  if (token) {
    localStorage.removeItem("g_token");
    localStorage.removeItem("gUserInfo");
    localStorage.removeItem("gUserId");
    dispatch(googleLogOutSuccess());
  } else {
    dispatch(googleLogOutFailure());
  }
};
