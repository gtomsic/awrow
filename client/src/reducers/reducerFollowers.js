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

export const reducerFollowerGetAllYouFanOf = (state = { fans: [] }, action) => {
  switch (action.type) {
    case FOLLOWER_GET_ALL_YOU_FAN_OF_REQUEST:
      return { loading: true };
    case FOLLOWER_GET_ALL_YOU_FAN_OF_SUCCESS:
      return { loading: false, success: true, fans: action.payload };
    case FOLLOWER_GET_ALL_YOU_FAN_OF_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const reducerFollowerGetAll = (state = { fans: [] }, action) => {
  switch (action.type) {
    case FOLLOWER_GET_ALL_REQUEST:
      return { loading: true };
    case FOLLOWER_GET_ALL_SUCCESS:
      return { loading: false, success: true, fans: action.payload };
    case FOLLOWER_GET_ALL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const reducerFollowerCountYourFans = (state = { count: 0 }, action) => {
  switch (action.type) {
    case FOLLOWER_COUNT_YOUR_FANS_REQUEST:
      return { loading: true };
    case FOLLOWER_COUNT_YOUR_FANS_SUCCESS:
      return { loading: false, success: true, count: action.payload };
    case FOLLOWER_COUNT_YOUR_FANS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerFollowerCountFanOf = (state = { count: 0 }, action) => {
  switch (action.type) {
    case FOLLOWER_COUNT_FANS_REQUEST:
      return { loading: true };
    case FOLLOWER_COUNT_FANS_SUCCESS:
      return { loading: false, success: true, count: action.payload };
    case FOLLOWER_COUNT_FANS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reducerFollowerCheckIfFanOf = (state = { user: {} }, action) => {
  switch (action.type) {
    case FOLLOWER_CHECK_IF_FAN_OF_REQUEST:
      return { loading: true };
    case FOLLOWER_CHECK_IF_FAN_OF_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case FOLLOWER_CHECK_IF_FAN_OF_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const reducerBeFanOrRemove = (state = { fan: {} }, action) => {
  switch (action.type) {
    case FOLLOWER_BE_FAN_OR_REMOVE_REQUEST:
      return { loading: true };
    case FOLLOWER_BE_FAN_OR_REMOVE_SUCCESS:
      return { loading: false, success: true, fan: action.payload };
    case FOLLOWER_BE_FAN_OR_REMOVE_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
