import { axiosApi } from '../apis/axios';
import {
  COMMENT_GET_TOP_TALKS_FAILED,
  COMMENT_GET_TOP_TALKS_REQUEST,
  COMMENT_GET_TOP_TALKS_SUCCESS,
  COMMENT_POST_DELETE_FAILED,
  COMMENT_POST_DELETE_REQUEST,
  COMMENT_POST_DELETE_SUCCESS,
  COMMENT_POST_EDIT_FAILED,
  COMMENT_POST_EDIT_REQUEST,
  COMMENT_POST_EDIT_SUCCESS,
  COMMENT_POST_FAILED,
  COMMENT_POST_REQUEST,
  COMMENT_POST_SUCCESS,
} from '../variables/variableComments';

export const actionCommentGetTopTalks = () => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: COMMENT_GET_TOP_TALKS_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.get(`/api/comments`, config);
    if (data) {
      dispatch({
        type: COMMENT_GET_TOP_TALKS_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    dispatch({
      type: COMMENT_GET_TOP_TALKS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionPostDeleteComment = (id) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: COMMENT_POST_DELETE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.delete(`/api/comments/${id}`, config);
    if (data) {
      dispatch({
        type: COMMENT_POST_DELETE_SUCCESS,
        payload: { id, success: Number(data) },
      });
      return data;
    }
  } catch (error) {
    dispatch({
      type: COMMENT_POST_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionPostEditComment = (body) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: COMMENT_POST_EDIT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.put(`/api/comments`, body, config);
    if (data) {
      dispatch({
        type: COMMENT_POST_EDIT_SUCCESS,
        payload: data,
      });
      return data;
    }
  } catch (error) {
    dispatch({
      type: COMMENT_POST_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const actionPostComment = (body) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: COMMENT_POST_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.post(`/api/comments`, body, config);
    if (data) {
      dispatch({
        type: COMMENT_POST_SUCCESS,
        payload: data,
      });
      dispatch(actionCommentGetTopTalks());
      return data;
    }
  } catch (error) {
    dispatch({
      type: COMMENT_POST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
