import {
  PHOTOS_CLEAR_ALBUM,
  PHOTOS_CREATE_ALBUM_FAILED,
  PHOTOS_CREATE_ALBUM_REQUEST,
  PHOTOS_CREATE_ALBUM_SUCCESS,
  PHOTOS_GET_BY_ALBUM_FAILED,
  PHOTOS_GET_BY_ALBUM_REQUEST,
  PHOTOS_GET_BY_ALBUM_SUCCESS,
} from '../variables/variablePhotos';

export const reducerPhotosCreateAlbum = (state = { photos: [] }, action) => {
  switch (action.type) {
    case PHOTOS_CREATE_ALBUM_REQUEST:
      return { loading: true };
    case PHOTOS_CREATE_ALBUM_SUCCESS:
      return { loading: false, success: true, photos: action.payload };
    case PHOTOS_CLEAR_ALBUM:
      return {};
    case PHOTOS_CREATE_ALBUM_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPhotosGetByAlbum = (state = { photos: [] }, action) => {
  switch (action.type) {
    case PHOTOS_GET_BY_ALBUM_REQUEST:
      return { loading: true };
    case PHOTOS_GET_BY_ALBUM_SUCCESS:
      return { loading: false, success: true, photos: action.payload };
    case PHOTOS_GET_BY_ALBUM_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
