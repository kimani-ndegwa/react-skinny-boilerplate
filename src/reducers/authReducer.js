import { LOGIN_ACTIONS } from "../actions/actionTypes";

let initialState = {
  isAuthenticated: false,
  userInfo: {}
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTIONS.LOGIN_USER_GOOGLE_REQUEST:
      return Object.assign({}, state, {
        data: action.data
      });
    case LOGIN_ACTIONS.LOGIN_USER_GOOGLE_SUCCESS: {
      let gUserInfo = localStorage.getItem("gUserInfo");
      return Object.assign({}, state, {
        data: action.data,
        isAuthenticated: true,
        userInfo: gUserInfo
      });
    }
    case LOGIN_ACTIONS.LOGIN_USER_GOOGLE_FAILURE: {
      return Object.assign({}, state, {
        data: action.data
      });
    }
    default:
      return state;
  }
};
