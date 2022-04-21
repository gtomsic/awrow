import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetAllPosts } from '../actions/actionPosts';
import PostItem from '../components/PostItem';
import Spinner from '../components/Spinner';

const PagePosts = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [posts, setPosts] = useState([]);
  const newPostItem = useSelector((state) => state.createdPost.post);
  const deletePost = useSelector((state) => state.postDeleted.deleted);
  const loginUser = useSelector((state) => state.loginUser.login);
  const userInfo = useSelector((state) => state.userInfo.profile);
  const auth = loginUser?.username === params.username;
  const allPostsOfYouFan = useSelector(
    (state) => state.allPostsOfYouFan.allposts
  );
  const {
    loading,
    posts: loadPosts,
    error,
  } = useSelector((state) => state.allPosts);

  useEffect(() => {
    if (loadPosts?.length > 0) {
      setPosts(loadPosts);
    }
  }, [loadPosts]);

  useEffect(() => {
    if (allPostsOfYouFan?.length > 0) {
      const filteredPosts = _.orderBy(
        [...allPostsOfYouFan, ...posts],
        ['createdAt'],
        ['desc']
      );
      setPosts(filteredPosts);
    }
  }, [allPostsOfYouFan]);

  useEffect(() => {
    if (params?.username) {
      dispatch(actionGetAllPosts(params.username, 0));
    }
  }, [dispatch, params]);

  useEffect(() => {
    if (deletePost?.id) {
      setPosts(posts.filter((item) => item.id !== deletePost.id));
    }
  }, [deletePost]);
  useEffect(() => {
    if (newPostItem?.id) {
      setPosts([{ ...newPostItem }, ...posts]);
    }
  }, [newPostItem]);

  const renderedPosts = () => {
    if (loading) {
      return <Spinner>Loading Post Items</Spinner>;
    } else if (posts[0]?.id) {
      return posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          photos={post.photos}
          user={post.user}
        />
      ));
    } else if (posts.length <= 0) {
      return (
        <div className="min-h-[300px] flex flex-col justify-center items-center rounded-md drop-shadow-sm">
          {auth ? (
            <h1 className="text-2xl px-4">
              You have not posted yet! Create your first post here.
            </h1>
          ) : (
            <h1 className="text-2xl px-4">
              {userInfo?.id && userInfo.name} have not posted yet!.
            </h1>
          )}
        </div>
      );
    } else if (error) {
      return <div className="p3 text-danger">{error}</div>;
    }
  };
  return <React.Fragment>{renderedPosts()}</React.Fragment>;
};

export default PagePosts;
