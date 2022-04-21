import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionPostDeleteComment,
  actionPostEditComment,
} from '../actions/actionComments';

import DialogBox from './DialogBox';

const CommentsItems = ({ comment: oldComment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState(oldComment);
  const [editMode, setEditMode] = useState(false);
  const [body, setBody] = useState('');
  const dispatch = useDispatch();
  const baseURL = useSelector((state) => state.baseURL);
  const user = useSelector((state) => state.loginUser.login);
  const editButtonHandler = () => {
    setEditMode(!editMode);
    setBody(comment.body);
  };
  const deleteButtonHandler = () => {
    dispatch(actionPostDeleteComment(comment.id));
  };
  const submitButtonHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = { ...comment, body };
    const newComment = await dispatch(actionPostEditComment(data));
    setComment(newComment);
    setEditMode(false);
    setBody('');
  };
  return (
    <React.Fragment>
      <div className="rounded-tr-md rounded-br-md rounded-bl-md py-2 px-4 bg-light bg-opacity-80 ml-6 mr-4 my-1">
        <div>
          <div className="grid grid-cols-2">
            <div className="flex">
              <img
                src={comment?.id && `${baseURL}/${comment.avatar}`}
                alt={comment?.id && comment.name}
                className="w-[30px] h-[30px] rounded-full mr-2"
              />
              <div>
                <div className="text-md font-bold text-primary text-opacity-70">
                  {comment?.id && comment.name}
                </div>
                <div className="text-gray text-sm text-opacity-50">
                  {comment?.body && moment(comment.createdAt).fromNow()}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              {user?.id && comment.user_id === user.id ? (
                <>
                  <div
                    onClick={editButtonHandler}
                    className="p-2 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer text-secondary"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </div>
                  <div
                    onClick={() => setIsOpen(true)}
                    className="p-2 text-center rounded-md hover:drop-shadow-md duration-300 cursor-pointer text-danger opacity-50"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          <div className="mt-1 ml-9">
            {editMode ? (
              <form
                onSubmit={submitButtonHandler}
                className="p-2 bg-gray-light bg-opacity-50 rounded-md drop-shadow-sm flex"
              >
                <input
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  type="text"
                  className="py-2 px-3 w-full rounded-md"
                />{' '}
                <button className="py-2 px-3 ml-2 bg-primary bg-opacity-80 text-white rounded-md">
                  Save
                </button>
              </form>
            ) : (
              <div className="text-md mb-2">
                {comment?.body && comment.body}
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogBox
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title="Are you sure you want to delete your comment?"
      >
        <div className="m-4">Please procceed if you're sure to delete!</div>
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
    </React.Fragment>
  );
};

export default CommentsItems;
