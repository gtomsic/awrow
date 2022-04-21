import { axiosApi } from '../apis/axios';
import {
  PHOTOS_CREATE_ALBUM_FAILED,
  PHOTOS_CREATE_ALBUM_REQUEST,
  PHOTOS_CREATE_ALBUM_SUCCESS,
  PHOTOS_GET_BY_ALBUM_FAILED,
  PHOTOS_GET_BY_ALBUM_REQUEST,
  PHOTOS_GET_BY_ALBUM_SUCCESS,
} from '../variables/variablePhotos';

export const actionPhotosCreateAlbum =
  (formData, album) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: PHOTOS_CREATE_ALBUM_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          album: `${album}`,
        },
      };
      const { data } = await axiosApi.post(`/api/photos`, formData, config);
      if (data) {
        dispatch({
          type: PHOTOS_CREATE_ALBUM_SUCCESS,
          payload: data,
        });
        return data;
      }
    } catch (error) {
      dispatch({
        type: PHOTOS_CREATE_ALBUM_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const actionGetPhotosByAlbum =
  (username) => async (dispatch, getState) => {
    const { token } = getState().loginUser.login;
    try {
      dispatch({ type: PHOTOS_GET_BY_ALBUM_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axiosApi.get(`/api/photos/${username}`, config);
      if (data) {
        dispatch({
          type: PHOTOS_GET_BY_ALBUM_SUCCESS,
          payload: data,
        });
        return data;
      }
    } catch (error) {
      dispatch({
        type: PHOTOS_GET_BY_ALBUM_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
