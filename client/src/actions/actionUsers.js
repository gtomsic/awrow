import _ from 'lodash';

import { axiosApi } from '../apis/axios';
import { POST_PHOTOS_SUCCESS } from '../variables/variablePosts';
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

export const actionSearchUsers = (term) => async (dispatch, getState) => {
  const token = getState().loginUser.login.token;
  try {
    const preparedPhotosFromStorage = localStorage.getItem('photosForPosts')
      ? JSON.parse(localStorage.getItem('photosForPosts'))
      : [];
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: USER_SEARCH_USER_REQUEST });
    const { data } = await axiosApi.get(
      `/api/users/search/${term}`,
      preparedPhotosFromStorage,
      config
    );
    if (data) {
      dispatch({ type: USER_SEARCH_USER_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: USER_SEARCH_USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionGetSingleUser = (username) => async (dispatch, getState) => {
  const token = getState().loginUser.login.token;
  try {
    dispatch({ type: USER_GET_SINGLE_USER_REQUEST });
    const data = await _fetchUser(username, token);
    if (data) {
      dispatch({
        type: USER_GET_SINGLE_USER_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    dispatch({
      type: USER_GET_SINGLE_USER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const _fetchUser = _.memoize(async (username, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axiosApi.get(`/api/users/${username}`, config);
  return data;
});

export const actionUpdateProfileInfo =
  (updatedData, token) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_INFO_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.put(
        `/api/users/info`,
        updatedData,
        config
      );
      if (data) {
        dispatch({
          type: USER_UPDATE_INFO_SUCCESS,
          payload: { ...data, token },
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data, token } });
        localStorage.setItem('login', JSON.stringify({ ...data, token }));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_INFO_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionUpdateProfileWallpaper =
  (formData, token) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_WALLPAPER_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.post(
        `/api/users/wallpaper`,
        formData,
        config
      );
      if (data) {
        dispatch({
          type: USER_UPDATE_WALLPAPER_SUCCESS,
          payload: { ...data, token },
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data, token } });
        localStorage.setItem('login', JSON.stringify({ ...data, token }));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_WALLPAPER_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionUpdateProfileAvatar =
  (formData, token) => async (dispatch) => {
    try {
      dispatch({ type: USER_UPDATE_AVATAR_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.post(
        `/api/users/avatar`,
        formData,
        config
      );
      if (data) {
        dispatch({
          type: USER_UPDATE_AVATAR_SUCCESS,
          payload: { ...data, token },
        });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: { ...data, token } });
        localStorage.setItem('login', JSON.stringify({ ...data, token }));
      }
    } catch (error) {
      dispatch({
        type: USER_UPDATE_AVATAR_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionLogoutUser = () => async (dispatch, getState) => {
  const token = getState().loginUser.login.token;
  const preparedPhotosFromStorage = localStorage.getItem('photosForPosts')
    ? JSON.parse(localStorage.getItem('photosForPosts'))
    : [];
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const { data } = await axiosApi.post(
    `/api/posts/images/cancel`,
    preparedPhotosFromStorage,
    config
  );
  if (data) {
    localStorage.clear();
    dispatch({ type: USER_LOGOUT });
    dispatch({
      type: POST_PHOTOS_SUCCESS,
      payload: data,
    });
  }
};

export const actionLoginUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosApi.post(
      `/api/users/login`,
      { ...userInfo },
      config
    );
    if (data) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem('login', JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionRegisterUser = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: USER_REIGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosApi.post(
      `/api/users/register`,
      { ...userInfo },
      config
    );
    if (data) {
      dispatch({
        type: USER_REIGISTER_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_REIGISTER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionCheckEmail = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHECK_EMAIL_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosApi.get(`/api/users/email/${email}`, config);
    if (data) {
      dispatch({ type: USER_CHECK_EMAIL_SUCCESS, payload: data });
    } else {
      return;
    }
  } catch (error) {
    dispatch({
      type: USER_CHECK_EMAIL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionCheckUsername = (username) => async (dispatch) => {
  try {
    dispatch({ type: USER_CHECK_USERNAME_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axiosApi.get(
      `/api/users/username/${username}`,
      config
    );
    if (data) {
      dispatch({ type: USER_CHECK_USERNAME_SUCCESS, payload: data });
    } else {
      return;
    }
  } catch (error) {
    dispatch({
      type: USER_CHECK_USERNAME_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionRequestVerification =
  (id, is_activated, email) => async (dispatch) => {
    try {
      dispatch({ type: USER_VERIFICATION_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axiosApi.put(
        `/api/users/verify`,
        { id, is_activated, email },
        config
      );
      if (data) {
        dispatch({ type: USER_VERIFICATION_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        localStorage.setItem('login', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({
        type: USER_VERIFICATION_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
