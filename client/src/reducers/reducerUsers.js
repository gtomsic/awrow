import {
  USER_CHECK_EMAIL_FAILED,
  USER_CHECK_EMAIL_REQUEST,
  USER_CHECK_EMAIL_SUCCESS,
  USER_CHECK_USERNAME_FAILED,
  USER_CHECK_USERNAME_REQUEST,
  USER_CHECK_USERNAME_SUCCESS,
  USER_GET_SINGLE_USER_FAILED,
  USER_GET_SINGLE_USER_REQUEST,
  USER_GET_SINGLE_USER_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REIGISTER_FAILED,
  USER_REIGISTER_REQUEST,
  USER_REIGISTER_SUCCESS,
  USER_SEARCH_USER_FAILED,
  USER_SEARCH_USER_REQUEST,
  USER_SEARCH_USER_SUCCESS,
  USER_UPDATE_AVATAR_FAILED,
  USER_UPDATE_AVATAR_REQUEST,
  USER_UPDATE_AVATAR_SUCCESS,
  USER_UPDATE_INFO_FAILED,
  USER_UPDATE_INFO_REQUEST,
  USER_UPDATE_INFO_SUCCESS,
  USER_UPDATE_WALLPAPER_FAILED,
  USER_UPDATE_WALLPAPER_REQUEST,
  USER_UPDATE_WALLPAPER_SUCCESS,
  USER_VERIFICATION_FAILED,
  USER_VERIFICATION_REQUEST,
  USER_VERIFICATION_SUCCESS,
} from '../variables/variableUsers';

export const reducerUserSearchUser = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_SEARCH_USER_REQUEST:
      return { loading: true };
    case USER_SEARCH_USER_SUCCESS:
      return { loading: false, success: true, users: action.payload };
    case USER_SEARCH_USER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerGetSingleUser = (state = { profile: {} }, action) => {
  switch (action.type) {
    case USER_GET_SINGLE_USER_REQUEST:
      return { loading: true };
    case USER_GET_SINGLE_USER_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case USER_GET_SINGLE_USER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerUpdateProfileInfo = (state = { profile: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_INFO_REQUEST:
      return { loading: true };
    case USER_UPDATE_INFO_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case USER_UPDATE_INFO_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerUpdateProfileWallpaper = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_WALLPAPER_REQUEST:
      return { loading: true };
    case USER_UPDATE_WALLPAPER_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case USER_UPDATE_WALLPAPER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerUpdateProfileAvatar = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_AVATAR_REQUEST:
      return { loading: true };
    case USER_UPDATE_AVATAR_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case USER_UPDATE_AVATAR_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerLoginUser = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, success: true, login: action.payload };
    case USER_LOGOUT:
      return {};
    case USER_LOGIN_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerRegisterUser = (state = { register: {} }, action) => {
  switch (action.type) {
    case USER_REIGISTER_REQUEST:
      return { loading: true };
    case USER_REIGISTER_SUCCESS:
      return { loading: false, success: true, register: action.payload };
    case USER_REIGISTER_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerUserVerification = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFICATION_REQUEST:
      return { loading: true };
    case USER_VERIFICATION_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case USER_VERIFICATION_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerCheckUsername = (state = { username: '' }, action) => {
  switch (action.type) {
    case USER_CHECK_USERNAME_REQUEST:
      return { loading: true };
    case USER_CHECK_USERNAME_SUCCESS:
      return { loading: false, username: action.payload };
    case USER_CHECK_USERNAME_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerCheckEmail = (state = { email: '' }, action) => {
  switch (action.type) {
    case USER_CHECK_EMAIL_REQUEST:
      return { loading: true };
    case USER_CHECK_EMAIL_SUCCESS:
      return { loading: false, email: action.payload };
    case USER_CHECK_EMAIL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
