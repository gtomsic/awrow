import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  actionFollowerCountFanOf,
  actionFollowerCountYourFans,
} from '../actions/actionFollowers';
import { actionPostCountall } from '../actions/actionPosts';

const ProfileSideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.loginUser.login);
  const baseURL = useSelector((state) => state.baseURL);
  const fanOf = useSelector((state) => state.countFanOf.count);
  const fanOfUser = useSelector((state) => state.fanOfUser.user);
  const yourFans = useSelector((state) => state.countYourFans.count);
  const postCount = useSelector((state) => state.postCountAll.count);
  const profileImage =
    user && user.avatar
      ? `url('${baseURL}/${user.avatar}')`
      : `url('${baseURL}/images/1defaults/profile.jpg')`;
  useEffect(() => {
    if (user?.id) {
      dispatch(actionFollowerCountFanOf({ user_id: user?.id }));
    }
  }, [dispatch, user, fanOfUser]);
  useEffect(() => {
    if (user?.id) {
      dispatch(actionFollowerCountYourFans(user?.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    if (user?.id) {
      dispatch(actionPostCountall());
    }
  }, [dispatch, user]);
  return (
    <div className="drop-shadow-sm bg-light p-2 sticky top-0 rounded-br-md rounded-bl-md">
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          navigate(`/${user?.id && user.username}/profile`);
        }}
        className="profileImage w-[160px] h-[160px] rounded-full mx-auto border-4 border-white drop-shadow-sm cursor-pointer"
        style={{
          backgroundImage: profileImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="bg-primary font-bold text-center py-2 text-md my-1 text-white uppercase rounded-sm">
        {user && user.name}
      </div>
      <Link to={`/${user?.username}/fansof`}>
        <div className="mt-1 p-2 border-white border flex justify-between">
          <span className="font-bold">
            <i className="fas fa-smile"></i> Fan of
          </span>
          <span className="font-bold text-primary">
            {fanOf?.count && fanOf.count}
          </span>
        </div>
      </Link>
      <Link to={`/${user?.username}/fans`}>
        <div className="mt-1 p-2 border-white border flex justify-between">
          <span className="font-bold">
            <i className="fa-solid fa-people-group"></i> Your Fans
          </span>
          <span className="font-bold text-primary">
            {yourFans?.count && yourFans.count}
          </span>
        </div>
      </Link>
      <Link to={`/${user?.username}`}>
        <div className="mt-1 p-2 border-white border flex justify-between">
          <span className="font-bold">
            <i className="fa-solid fa-signs-post"></i> Your Posts
          </span>
          <span className="font-bold text-primary">{postCount?.count}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProfileSideBar;
