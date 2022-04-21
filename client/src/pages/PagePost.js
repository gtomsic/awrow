import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetSinglePost } from '../actions/actionPosts';
import PostItem from '../components/PostItem';

const PagePost = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.singlePost.post);
  useEffect(() => {
    if (params?.post_id) {
      dispatch(actionGetSinglePost(params.post_id));
    }
  }, [dispatch, params]);
  return (
    <>
      {post?.id && (
        <PostItem post={post} photos={post.photos} user={post.user} />
      )}
    </>
  );
};

export default PagePost;
