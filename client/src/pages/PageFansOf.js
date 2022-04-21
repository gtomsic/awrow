import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionFollowerGetAllYouFansOf } from '../actions/actionFollowers';
import UserCard from '../components/UserCard';

const PageFans = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const allFans = useSelector((state) => state.getAllYouFansOf.fans);
  useEffect(() => {
    if (params.username) {
      dispatch(actionFollowerGetAllYouFansOf(params.username));
    }
  }, [dispatch, params]);
  return (
    <div className="mt-4">
      {allFans?.length > 0 &&
        allFans?.map((user) => {
          return (
            <UserCard user={user} key={user.id} clickHandler={() => () => {}} />
          );
        })}
    </div>
  );
};

export default PageFans;
