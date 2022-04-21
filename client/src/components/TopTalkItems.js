import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionGetSinglePost } from '../actions/actionPosts';

const TopTalkItems = ({ top }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({});
  const baseURL = useSelector((state) => state.baseURL);
  const imageUrl = `url('${
    post?.id && post?.photos.length > 0
      ? `${baseURL}/${post.photos[0].images}`
      : `${baseURL}/${post?.user?.id && post.user.avatar}`
  }')`;
  useEffect(() => {
    getPost(top.post_id);
  }, [top]);
  const getPost = async (post_id) => {
    const originalPost = await dispatch(actionGetSinglePost(post_id));
    setPost(originalPost);
  };
  const body = post?.body && post.body.split('').splice(0, 17).join('');
  return (
    <Link
      to={`/${post?.id && post.user.username}/posts/${post?.id && post.id}/${
        post?.id && post.user.id
      }`}
    >
      <div
        key={top.post_id}
        className=" p-1 text-center border drop-shadow-sm border-white mt-1 cursor-pointer"
      >
        <div className="text-xs flex justify-between">
          <div
            className="h-[40px] w-[50px] mr-2"
            style={{
              backgroundImage: imageUrl,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div className="text-left flex-1">
            <span className="font-bold text-primary">
              {post?.user && post.user.name}
            </span>
            <p>{body?.length < 17 ? body : body + '...'}</p>
            <p className="font-bold text-primary">{top.count}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopTalkItems;
