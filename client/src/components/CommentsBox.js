import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionPostComment } from '../actions/actionComments';
import CommentsItems from './CommentsItems';

const CommentsBox = ({ post_id }) => {
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const baseURL = useSelector((state) => state.baseURL);
  const user = useSelector((state) => state.loginUser.login);
  const post = useSelector((state) => state.singlePost.post);
  const commentButtonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      body,
      post_id,
      user_id: user.id,
    };
    if (body && body.length > 1) {
      dispatch(actionPostComment(data));
      setBody('');
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-col px-2 bg-light">
        <form onSubmit={commentButtonHandler} className="flex">
          <img
            src={
              user?.avatar
                ? `${baseURL}/${user.avatar}`
                : `${baseURL}/images/1defaults/profile.jpg`
            }
            alt={user?.id && user.name}
            className="w-[45px] h-[45px] rounded-full mr-2 drop-shadow-sm"
          />
          <input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoFocus={true}
            name="comment"
            type="text"
            className="p-3 w-full rounded-md"
            placeholder="Write your comment..."
          />
          <button className="p-3 ml-2 rounded-md drop-shadow-sm bg-primary hover:opacity-80 duration-300 text-white">
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4">
        {post?.id &&
          post.comments.map((comment) => (
            <CommentsItems key={comment.id} comment={comment} />
          ))}
      </div>
    </React.Fragment>
  );
};

export default CommentsBox;
