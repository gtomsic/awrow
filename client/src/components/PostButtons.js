import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionLikesOrRemoveLikesPost } from '../actions/actionLikes';
import { actionDeletePostAndPhotos } from '../actions/actionPosts';

import DialogBox from './DialogBox';

const PostButtons = ({ post: fromPostItem, onEditHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [post, setPost] = useState(fromPostItem);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginUser.login);
  const newComment = useSelector((state) => state.postComment.post);
  const postCommentDelete = useSelector(
    (state) => state.postCommentDelete.delete
  );
  useEffect(() => {
    if (postCommentDelete?.id) {
      const removeComments = post.comments.filter(
        (item) => item.id !== postCommentDelete.id
      );
      setPost({ ...post, comments: [...removeComments] });
    }
  }, [postCommentDelete]);
  useEffect(() => {
    if (newComment?.id && post.id === newComment.post_id) {
      setPost({ ...post, comments: [newComment, ...post.comments] });
    }
  }, [newComment]);
  const editButtonHandler = (e) => {
    e.stopPropagation();
    onEditHandler(e);
  };
  const deleteButtonHandler = () => {
    dispatch(actionDeletePostAndPhotos(post.id));
  };
  const likeButtonHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      post_id: post.id,
      user_id: user.id,
    };
    const newLike = await dispatch(actionLikesOrRemoveLikesPost(data));
    if (newLike.id) {
      setPost({ ...post, likes: [...post.likes, newLike] });
    } else {
      setPost({
        ...post,
        likes: post.likes.filter((item) => item.user_id !== user.id),
      });
    }
  };
  return (
    <div className="grid grid-cols-4 mb-4 mx-2 text-sm">
      <div
        onClick={likeButtonHandler}
        className={`py-3 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer ${
          post?.id && post.likes.find((isLike) => isLike.user_id === user.id)
            ? 'text-primary'
            : 'text-gray'
        }`}
      >
        <i className="fa-solid fa-thumbs-up"></i> Right{' '}
        {post?.id && post.likes.length ? post.likes.length : ''}
      </div>
      <div
        className={`py-3 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer ${
          post?.id && post.comments.length > 0 ? 'text-primary' : 'text-gray'
        }`}
      >
        <i className="fa-solid fa-comment-dots"></i> Talks{' '}
        {post?.id && post.comments.length ? post.comments.length : ''}
      </div>
      {user?.id && post.user_id === user.id ? (
        <>
          <div
            onClick={(e) => editButtonHandler(e)}
            className="py-3 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer text-secondary"
          >
            <i className="fa-solid fa-pen-to-square"></i> Edit
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="py-3 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer text-danger opacity-50"
          >
            <i className="fa-solid fa-trash-can"></i> Delete
          </div>
        </>
      ) : null}

      <DialogBox
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title="Are you sure you want to delete this post?"
      >
        <div className="m-4">This is not going to get recover!</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-center py-2 px-11 bg-gray text-white rounded-md outline-none"
          >
            Cancel
          </button>
          <button
            onClick={deleteButtonHandler}
            className="text-center py-2 px-11 bg-danger text-white rounded-md outline-none"
          >
            Yes
          </button>
        </div>
      </DialogBox>
    </div>
  );
};

export default PostButtons;
