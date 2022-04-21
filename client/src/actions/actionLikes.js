import { axiosApi } from '../apis/axios';
import {
  LIKE_POST_FAILED,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from '../variables/variableLikes';

export const actionLikesOrRemoveLikesPost =
  (body) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: LIKE_POST_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.post(`/api/likes`, body, config);
      if (data) {
        dispatch({
          type: LIKE_POST_SUCCESS,
          payload: data,
        });
      }
      return data;
    } catch (error) {
      dispatch({
        type: LIKE_POST_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
