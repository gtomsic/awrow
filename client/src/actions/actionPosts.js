import { axiosApi } from '../apis/axios';
import _ from 'lodash';
import {
  POST_CANCEL_PHOTOS_FAILED,
  POST_CANCEL_PHOTOS_REQUEST,
  POST_CANCEL_PHOTOS_SUCCESS,
  POST_COUNT_ALL_FAILED,
  POST_COUNT_ALL_REQUEST,
  POST_COUNT_ALL_SUCCESS,
  POST_CREATE_FAILED,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_AND_PHOTOS_FAILED,
  POST_DELETE_AND_PHOTOS_REQUEST,
  POST_DELETE_AND_PHOTOS_SUCCESS,
  POST_DELETE_PHOTO_FAILED,
  POST_DELETE_PHOTO_REQUEST,
  POST_DELETE_PHOTO_SUCCESS,
  POST_EDIT_BODY_FAILED,
  POST_EDIT_BODY_REQUEST,
  POST_EDIT_BODY_SUCCESS,
  POST_FIND_ALL_POST_OF_YOU_FAN_FAILED,
  POST_FIND_ALL_POST_OF_YOU_FAN_REQUEST,
  POST_FIND_ALL_POST_OF_YOU_FAN_SUCCESS,
  POST_GET_ALL_FAILED,
  POST_GET_ALL_REQUEST,
  POST_GET_ALL_SUCCESS,
  POST_GET_SINGLE_FAILED,
  POST_GET_SINGLE_REQUEST,
  POST_GET_SINGLE_SUCCESS,
  POST_PHOTOS_FAILED,
  POST_PHOTOS_REQUEST,
  POST_PHOTOS_SUCCESS,
} from '../variables/variablePosts';
export const actionFindAllPostOfYouFan =
  (username) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: POST_FIND_ALL_POST_OF_YOU_FAN_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/posts/allposts/${username}`,
        config
      );
      if (data) {
        dispatch({
          type: POST_FIND_ALL_POST_OF_YOU_FAN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: POST_FIND_ALL_POST_OF_YOU_FAN_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionPostCountall = () => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: POST_COUNT_ALL_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.get(`/api/posts/count`, config);
    if (data) {
      dispatch({
        type: POST_COUNT_ALL_SUCCESS,
        payload: data[0],
      });
    }
  } catch (error) {
    dispatch({
      type: POST_COUNT_ALL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionPostEditBody = (body) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: POST_EDIT_BODY_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.put(`/api/posts`, body, config);
    if (data) {
      dispatch({
        type: POST_EDIT_BODY_SUCCESS,
        payload: { ...data[1] },
      });
      dispatch(actionGetSinglePost(body.id));
    }
  } catch (error) {
    dispatch({
      type: POST_EDIT_BODY_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionDeletePhoto =
  (post_id, photo_id, images) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: POST_DELETE_PHOTO_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.put(
        `/api/posts/photo`,
        { id: photo_id, images },
        config
      );
      if (data) {
        dispatch({
          type: POST_DELETE_PHOTO_SUCCESS,
          payload: data,
        });
        dispatch(actionGetSinglePost(post_id));
      }
    } catch (error) {
      dispatch({
        type: POST_DELETE_PHOTO_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionGetSinglePost = (post_id) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: POST_GET_SINGLE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.get(`/api/posts/single/${post_id}`, config);
    if (data) {
      dispatch({
        type: POST_GET_SINGLE_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    dispatch({
      type: POST_GET_SINGLE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionDeletePostAndPhotos =
  (post_id) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: POST_DELETE_AND_PHOTOS_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.delete(`/api/posts/${post_id}`, config);
      if (data) {
        localStorage.setItem('posts', JSON.stringify(data));
        dispatch({
          type: POST_DELETE_AND_PHOTOS_SUCCESS,
          payload: { data, id: post_id },
        });
      }
    } catch (error) {
      dispatch({
        type: POST_DELETE_AND_PHOTOS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionGetAllPosts = (username) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: POST_GET_ALL_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.get(`/api/posts/${username}`, config);
    if (data) {
      localStorage.setItem('posts', JSON.stringify(data));
      dispatch({
        type: POST_GET_ALL_SUCCESS,
        payload: data,
      });
      dispatch(actionFindAllPostOfYouFan(username));
    }
  } catch (error) {
    dispatch({
      type: POST_GET_ALL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionCreatePostItem =
  (postData) => async (dispatch, getState) => {
    const token = getState().loginUser.login.token;
    try {
      dispatch({ type: POST_CREATE_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.post(`/api/posts`, postData, config);
      if (data) {
        localStorage.removeItem('photosForPosts');
        localStorage.removeItem('postBody');
        dispatch({
          type: POST_CREATE_SUCCESS,
          payload: data,
        });
        dispatch({
          type: POST_PHOTOS_SUCCESS,
          payload: [],
        });
        dispatch({
          type: POST_CANCEL_PHOTOS_SUCCESS,
          payload: [],
        });
        dispatch(actionPostCountall());
      }
    } catch (error) {
      dispatch({
        type: POST_CREATE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionCancelPhotos = (formData) => async (dispatch, getState) => {
  const token = getState().loginUser.login.token;
  try {
    dispatch({ type: POST_CANCEL_PHOTOS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.post(
      `/api/posts/images/cancel`,
      formData,
      config
    );
    if (data) {
      dispatch({
        type: POST_CANCEL_PHOTOS_SUCCESS,
        payload: data,
      });
      dispatch({
        type: POST_PHOTOS_SUCCESS,
        payload: data,
      });
    }
    localStorage.removeItem('photosForPosts');
  } catch (error) {
    dispatch({
      type: POST_CANCEL_PHOTOS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const actionPreparePhotos = (formData) => async (dispatch, getState) => {
  const token = getState().loginUser.login.token;
  try {
    dispatch({ type: POST_PHOTOS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.post(`/api/posts/images`, formData, config);
    if (data) {
      dispatch({
        type: POST_PHOTOS_SUCCESS,
        payload: data,
      });
    }
    localStorage.setItem('photosForPosts', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: POST_PHOTOS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
