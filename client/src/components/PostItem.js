import React, { useEffect, useState } from 'react';
import moment from 'moment';
import BoxesFive from './boxes/BoxesFive';
import BoxesFour from './boxes/BoxesFour';
import BoxesThree from './boxes/BoxesThree';
import BoxesTwo from './boxes/BoxesTwo';
import BoxOne from './boxes/BoxOne';
import PostButtons from './PostButtons';
import { useDispatch, useSelector } from 'react-redux';
import CommentsItems from './CommentsItems';
import { actionPostComment } from '../actions/actionComments';
import EditPostItem from './EditPostItem';
import PhotoView from './PhotoView';
import { Link } from 'react-router-dom';

const PostItem = ({ post: oldPost, photos: oldPhotos, user }) => {
  let [commentStep, setCommentStep] = useState(5);
  let [baseIndex, setBaseIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState(oldPost);
  const [photos, setPhotos] = useState(oldPhotos);
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const baseURL = useSelector((state) => state.baseURL);
  const loginUser = useSelector((state) => state.loginUser.login);
  const updatedPost = useSelector((state) => state.singlePost.post);
  const postCommentDelete = useSelector(
    (state) => state.postCommentDelete.delete
  );
  useEffect(() => {
    if (updatedPost?.id && post.id === updatedPost.id) {
      setPost(updatedPost);
      setPhotos(updatedPost.photos);
    }
  }, [updatedPost]);
  useEffect(() => {
    if (postCommentDelete?.id) {
      const removeComments = post.comments.filter(
        (item) => item.id !== postCommentDelete.id
      );
      setPost({ ...post, comments: [...removeComments] });
    }
  }, [postCommentDelete]);
  const commentButtonHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      body,
      post_id: post.id,
      user_id: loginUser.id,
      name: loginUser.name,
      avatar: loginUser.avatar,
    };
    if (body && body.length > 1) {
      const comment = await dispatch(actionPostComment(data));
      setPost({ ...post, comments: [comment, ...post.comments] });
      setBody('');
    }
  };

  const onEditHandler = () => {
    setEditMode(false);
  };
  const editButtonHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setEditMode(true);
  };

  const clickHandler = (index) => {
    setBaseIndex(index);
    setIsOpen(true);
  };

  const renderedBoxed = () => {
    if (Number(photos.length) >= 5) {
      return <BoxesFive photos={photos} clickHandler={clickHandler} />;
    }
    if (Number(photos.length) === 4) {
      return <BoxesFour photos={photos} clickHandler={clickHandler} />;
    }
    if (Number(photos.length) === 3) {
      return <BoxesThree photos={photos} clickHandler={clickHandler} />;
    }
    if (Number(photos.length) === 2) {
      return <BoxesTwo photos={photos} clickHandler={clickHandler} />;
    }
    if (Number(photos.length) === 1) {
      return <BoxOne photos={photos} clickHandler={clickHandler} />;
    }
  };
  return (
    <>
      {editMode ? (
        <EditPostItem
          onEditHandler={onEditHandler}
          post_id={post?.id && post.id}
        />
      ) : (
        <div className="flex flex-col mt-4 mb-1 z-10 bg-light bg-opacity-20 drop-shadow-sm rounded-lg overflow-hidden mx-2 md:mx-0">
          <Link to={`/${user?.username}`}>
            <div className="p-3 flex justify-between">
              <div className="flex items-center">
                <img
                  src={post?.user && `${baseURL}/${post.user.avatar}`}
                  alt={post?.user && `${baseURL}/${post.user.name}`}
                  className="w-[40px] rounded-full drop-shadow-sm mr-3"
                />
                <div>
                  <span className="font-bold text-primary">
                    {post?.user && `${post.user.name}`}
                  </span>
                  <p className="text-sm text-primary font-bold text-opacity-50">
                    {' '}
                    @{post?.user && `${post.user.username}`}
                  </p>
                </div>
              </div>
              <span className="text-gray">
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
          </Link>
          <div className="px-2">{renderedBoxed()}</div>
          <div className="p-3">
            <p>{post.body}</p>
          </div>
          <PostButtons
            post={post}
            onEditHandler={(e) => editButtonHandler(e)}
          />
        </div>
      )}

      <form
        onSubmit={commentButtonHandler}
        className="flex bg-light p-2 mx-2 rounded-md drop-shadow-sm"
      >
        <img
          src={loginUser?.id && `${baseURL}/${loginUser.avatar}`}
          alt={loginUser?.id && loginUser.name}
          className="w-[35px] h-[35px] rounded-full mr-2 drop-shadow-sm"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name="comment"
          type="text"
          className="px-3 py-1 w-full rounded-md"
          placeholder="Write your comment..."
        />
        <button className="py-1 px-3 ml-2 rounded-md drop-shadow-sm bg-primary bg-opacity-80 hover:opacity-95 duration-300 text-white">
          Submit
        </button>
      </form>
      {post?.id &&
        post.comments.map((comment, index) => {
          if (index >= commentStep) {
            return;
          }
          return <CommentsItems key={comment.id} comment={comment} />;
        })}
      {post?.comments?.length > 5 ? (
        post.comments.length <= commentStep ? null : (
          <div
            onClick={() => setCommentStep((commentStep = commentStep + 5))}
            className="mt-4 text-center font-bold text-primary cursor-pointer"
          >
            More ...
          </div>
        )
      ) : null}
      <PhotoView
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        index={baseIndex}
        photos={photos}
      />
    </>
  );
};

export default PostItem;
