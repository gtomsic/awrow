import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  reducerCommentGetTopTalks,
  reducerPostComment,
  reducerPostDeleteComment,
  reducerPostEditComment,
} from '../reducers/reducerComments';
import {
  reducerBeFanOrRemove,
  reducerFollowerCheckIfFanOf,
  reducerFollowerCountFanOf,
  reducerFollowerCountYourFans,
  reducerFollowerGetAll,
  reducerFollowerGetAllYouFanOf,
} from '../reducers/reducerFollowers';
import { reducerLikeOrRemoveLikesPost } from '../reducers/reducerLikes';
import {
  reducerPhotosCreateAlbum,
  reducerPhotosGetByAlbum,
} from '../reducers/reducerPhotos';

import {
  reducerCreatePost,
  reducerDeletePhoto,
  reducerDeletePostAndPhotos,
  reducerFindAllPostOfYouFan,
  reducerGetAllPosts,
  reducerGetSinglePost,
  reducerPostCountAll,
  reducerPostEditBody,
  reducerPostPhotos,
} from '../reducers/reducerPosts';
import {
  reducerCheckEmail,
  reducerCheckUsername,
  reducerGetSingleUser,
  reducerLoginUser,
  reducerRegisterUser,
  reducerUpdateProfileAvatar,
  reducerUpdateProfileInfo,
  reducerUpdateProfileWallpaper,
  reducerUserSearchUser,
  reducerUserVerification,
} from '../reducers/reducerUsers';

const userLoginFromStorage = localStorage.getItem('login')
  ? JSON.parse(localStorage.getItem('login'))
  : {};

const preparedPhotosFromStorage = localStorage.getItem('photosForPosts')
  ? JSON.parse(localStorage.getItem('photosForPosts'))
  : [];

const reducer = combineReducers({
  baseURL: () => 'https://api.awrow.com',
  activated: reducerUserVerification,
  checkUsername: reducerCheckUsername,
  checkEmail: reducerCheckEmail,
  registerUser: reducerRegisterUser,
  loginUser: reducerLoginUser,
  userInfo: reducerGetSingleUser,
  userResults: reducerUserSearchUser,
  updatedAvatar: reducerUpdateProfileAvatar,
  updatedWallpaper: reducerUpdateProfileWallpaper,
  updatedInfo: reducerUpdateProfileInfo,
  postPhotos: reducerPostPhotos,
  createdPost: reducerCreatePost,
  allPosts: reducerGetAllPosts,
  allPostsOfYouFan: reducerFindAllPostOfYouFan,
  postDeleted: reducerDeletePostAndPhotos,
  postEdited: reducerPostEditBody,
  singlePost: reducerGetSinglePost,
  deletedPhoto: reducerDeletePhoto,
  postComment: reducerPostComment,
  postLike: reducerLikeOrRemoveLikesPost,
  postEdit: reducerPostEditComment,
  postCommentDelete: reducerPostDeleteComment,
  postCountAll: reducerPostCountAll,
  photosByAlbum: reducerPhotosGetByAlbum,
  photosCreateAlbum: reducerPhotosCreateAlbum,
  beFansRequest: reducerBeFanOrRemove,
  fanOfUser: reducerFollowerCheckIfFanOf,
  countFanOf: reducerFollowerCountFanOf,
  countYourFans: reducerFollowerCountYourFans,
  getTopTalks: reducerCommentGetTopTalks,
  getAllFans: reducerFollowerGetAll,
  getAllYouFansOf: reducerFollowerGetAllYouFanOf,
});

const initialState = {
  loginUser: { login: userLoginFromStorage },
  postPhotos: { photos: preparedPhotosFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
