import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TopTalkItems from './TopTalkItems';
import _ from 'lodash';
import { actionCommentGetTopTalks } from '../actions/actionComments';

const TopTalk = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser.login);
  const topTalks = useSelector((state) => state.getTopTalks.top_talks);
  const sortByCount = _.orderBy(topTalks, ['count'], ['desc']);
  useEffect(() => {
    if (user?.id) {
      dispatch(actionCommentGetTopTalks());
    }
  }, [dispatch, user]);
  const renderedTopTalks = () => {
    if (topTalks?.length > 0 && user?.id) {
      return sortByCount.map((top) => (
        <TopTalkItems key={top.post_id} top={top} />
      ));
    }
  };
  return (
    <div className="bg-light p-2 sticky top-0 rounded-br-md rounded-bl-md drop-shadow-sm">
      <div className=" px-3 py-2 text-center border bg-primary drop-shadow-sm border-white">
        <div className="font-bold text-white">Top Talks</div>
      </div>
      {renderedTopTalks()}
    </div>
  );
};

export default TopTalk;
