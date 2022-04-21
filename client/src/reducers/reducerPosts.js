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

export const reducerFindAllPostOfYouFan = (
  state = { allposts: [] },
  action
) => {
  switch (action.type) {
    case POST_FIND_ALL_POST_OF_YOU_FAN_REQUEST:
      return { loading: true };
    case POST_FIND_ALL_POST_OF_YOU_FAN_SUCCESS:
      return { loading: false, success: true, allposts: action.payload };
    case POST_FIND_ALL_POST_OF_YOU_FAN_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPostCountAll = (state = { count: 0 }, action) => {
  switch (action.type) {
    case POST_COUNT_ALL_REQUEST:
      return { loading: true };
    case POST_COUNT_ALL_SUCCESS:
      return { loading: false, success: true, count: action.payload };
    case POST_COUNT_ALL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const reducerPostEditBody = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_EDIT_BODY_REQUEST:
      return { loading: true };
    case POST_EDIT_BODY_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_EDIT_BODY_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerDeletePhoto = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_DELETE_PHOTO_REQUEST:
      return { loading: true };
    case POST_DELETE_PHOTO_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_DELETE_PHOTO_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerGetSinglePost = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_GET_SINGLE_REQUEST:
      return { loading: true };
    case POST_GET_SINGLE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_GET_SINGLE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerDeletePostAndPhotos = (state = { deleted: [] }, action) => {
  switch (action.type) {
    case POST_DELETE_AND_PHOTOS_REQUEST:
      return { loading: true };
    case POST_DELETE_AND_PHOTOS_SUCCESS:
      return { loading: false, success: true, deleted: action.payload };
    case POST_DELETE_AND_PHOTOS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerGetAllPosts = (state = { posts: [] }, action) => {
  switch (action.type) {
    case POST_GET_ALL_REQUEST:
      return { loading: true };
    case POST_GET_ALL_SUCCESS:
      return { loading: false, success: true, posts: action.payload };
    case POST_GET_ALL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerCreatePost = (state = { post: {} }, action) => {
  switch (action.type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case POST_CREATE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPostPhotos = (state = [], action) => {
  switch (action.type) {
    case POST_PHOTOS_REQUEST:
      return { loading: true };
    case POST_PHOTOS_SUCCESS:
      return { loading: false, success: true, photos: action.payload };
    case POST_PHOTOS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerCancelPostPhotos = (state = [], action) => {
  switch (action.type) {
    case POST_CANCEL_PHOTOS_REQUEST:
      return { loading: true };
    case POST_CANCEL_PHOTOS_SUCCESS:
      return { loading: false, success: true, photos: [] };
    case POST_CANCEL_PHOTOS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
