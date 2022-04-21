import { axiosApi } from '../apis/axios';
import {
  FOLLOWER_BE_FAN_OR_REMOVE_FAILED,
  FOLLOWER_BE_FAN_OR_REMOVE_REQUEST,
  FOLLOWER_BE_FAN_OR_REMOVE_SUCCESS,
  FOLLOWER_CHECK_IF_FAN_OF_FAILED,
  FOLLOWER_CHECK_IF_FAN_OF_REQUEST,
  FOLLOWER_CHECK_IF_FAN_OF_SUCCESS,
  FOLLOWER_COUNT_FANS_FAILED,
  FOLLOWER_COUNT_FANS_REQUEST,
  FOLLOWER_COUNT_FANS_SUCCESS,
  FOLLOWER_COUNT_YOUR_FANS_FAILED,
  FOLLOWER_COUNT_YOUR_FANS_REQUEST,
  FOLLOWER_COUNT_YOUR_FANS_SUCCESS,
  FOLLOWER_GET_ALL_FAILED,
  FOLLOWER_GET_ALL_REQUEST,
  FOLLOWER_GET_ALL_SUCCESS,
  FOLLOWER_GET_ALL_YOU_FAN_OF_FAILED,
  FOLLOWER_GET_ALL_YOU_FAN_OF_REQUEST,
  FOLLOWER_GET_ALL_YOU_FAN_OF_SUCCESS,
} from '../variables/variableFollowers';

export const actionFollowerGetAllYouFansOf =
  (username) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: FOLLOWER_GET_ALL_YOU_FAN_OF_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/followers/get_all_you_fan_of/${username}`,
        config
      );
      if (data) {
        dispatch({
          type: FOLLOWER_GET_ALL_YOU_FAN_OF_SUCCESS,
          payload: data,
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: FOLLOWER_GET_ALL_YOU_FAN_OF_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionFollowerGetAll =
  (username) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: FOLLOWER_GET_ALL_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/followers/get_all/${username}`,
        config
      );
      if (data) {
        dispatch({
          type: FOLLOWER_GET_ALL_SUCCESS,
          payload: data,
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: FOLLOWER_GET_ALL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionFollowerCountYourFans =
  (user_id) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: FOLLOWER_COUNT_YOUR_FANS_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/followers/your_fans/${user_id}`,
        config
      );
      if (data) {
        dispatch({
          type: FOLLOWER_COUNT_YOUR_FANS_SUCCESS,
          payload: data[0],
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: FOLLOWER_COUNT_YOUR_FANS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionFollowerCountFanOf =
  (body) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: FOLLOWER_COUNT_FANS_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/followers/fans_of/${body.user_id}`,
        config
      );
      if (data) {
        dispatch({
          type: FOLLOWER_COUNT_FANS_SUCCESS,
          payload: data[0],
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: FOLLOWER_COUNT_FANS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionFollowerCheckIfFanOf =
  (body) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: FOLLOWER_CHECK_IF_FAN_OF_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(
        `/api/followers/${body.followed_id}/${body.user_id}`,
        config
      );
      if (data) {
        dispatch({
          type: FOLLOWER_CHECK_IF_FAN_OF_SUCCESS,
          payload: data,
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: FOLLOWER_CHECK_IF_FAN_OF_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const actionBeFanOrRemove = (body) => async (dispatch, getState) => {
  const { token } = getState().loginUser.login;
  try {
    dispatch({ type: FOLLOWER_BE_FAN_OR_REMOVE_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axiosApi.post(`/api/followers`, body, config);
    if (data) {
      dispatch({
        type: FOLLOWER_BE_FAN_OR_REMOVE_SUCCESS,
        payload: data,
      });
      dispatch(actionFollowerCheckIfFanOf(body));
    }
    return data;
  } catch (error) {
    dispatch({
      type: FOLLOWER_BE_FAN_OR_REMOVE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
