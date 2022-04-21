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

export const reducerCommentGetTopTalks = (
  state = { top_talks: [] },
  action
) => {
  switch (action.type) {
    case COMMENT_GET_TOP_TALKS_REQUEST:
      return { loading: true };
    case COMMENT_GET_TOP_TALKS_SUCCESS:
      return { loading: false, success: true, top_talks: action.payload };
    case COMMENT_GET_TOP_TALKS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPostDeleteComment = (state = { deleted: 0 }, action) => {
  switch (action.type) {
    case COMMENT_POST_DELETE_REQUEST:
      return { loading: true };
    case COMMENT_POST_DELETE_SUCCESS:
      return { loading: false, success: true, delete: action.payload };
    case COMMENT_POST_DELETE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPostEditComment = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_POST_EDIT_REQUEST:
      return { loading: true };
    case COMMENT_POST_EDIT_SUCCESS:
      return { loading: false, success: true, comment: action.payload };
    case COMMENT_POST_EDIT_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerPostComment = (state = { comment: {} }, action) => {
  switch (action.type) {
    case COMMENT_POST_REQUEST:
      return { loading: true };
    case COMMENT_POST_SUCCESS:
      return { loading: false, success: true, post: action.payload };
    case COMMENT_POST_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
