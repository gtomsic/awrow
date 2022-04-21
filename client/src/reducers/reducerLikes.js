import {
  LIKE_POST_FAILED,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
} from '../variables/variableLikes';

export const reducerLikeOrRemoveLikesPost = (state = { like: {} }, action) => {
  switch (action.type) {
    case LIKE_POST_REQUEST:
      return { loading: true };
    case LIKE_POST_SUCCESS:
      return { loading: false, success: true, like: action.payload };
    case LIKE_POST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
