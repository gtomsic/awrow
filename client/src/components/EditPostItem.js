import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  actionDeletePhoto,
  actionGetSinglePost,
  actionPostEditBody,
} from '../actions/actionPosts';
import DialogBox from './DialogBox';

const EditPostItem = ({ onEditHandler, post_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState('');
  const [toDelete, setToDelete] = useState({});
  const dispatch = useDispatch();
  const params = useParams();
  const baseURL = useSelector((state) => state.baseURL);
  const { post } = useSelector((state) => state.singlePost);
  useEffect(() => {
    if (post_id) {
      dispatch(actionGetSinglePost(post_id));
    }
  }, [dispatch, params, post_id]);
  useEffect(() => {
    if (post?.body) {
      setBody(post.body);
    }
  }, [post]);
  const deleteImageHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(actionDeletePhoto(post.id, toDelete.id, toDelete.photo));
    setIsOpen(false);
  };
  const saveButtonHandler = () => {
    dispatch(actionPostEditBody({ body, id: post.id }));
    onEditHandler();
  };
  const renderedImages = () => {
    return (
      post?.id &&
      post.photos.map((photo) => {
        return (
          <div
            key={photo.id}
            className="h-[130px] md:h-[0=150px] relative"
            style={{
              backgroundImage: `url('${baseURL}/${photo.images}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div
              onClick={() => {
                setIsOpen(true);
                setToDelete({ id: photo.id, photo: photo.images });
              }}
              className="absolute top-1 right-2 text-light drop-shadow-md cursor-pointer"
            >
              <i className="fa-solid fa-trash-can"></i>
            </div>
          </div>
        );
      })
    );
  };
  return (
    <div className="p-2 bg-light mt-4 rounded-md min-h-[620px] flex flex-col mb-2">
      <div className="mb-4">
        <button
          onClick={() => onEditHandler()}
          className="bg-light text-primary bg-opacity-90 py-2 rounded-md w-full drop-shadow-sm"
        >
          <i className="fa-solid fa-chevron-left"></i> Back And Save
        </button>
      </div>
      <div>
        <div className="images grid grid-cols-4 gap-1">{renderedImages()}</div>
      </div>
      <div className="flex-1"></div>
      <textarea
        value={body || ''}
        onChange={(e) => setBody(e.target.value)}
        name="body"
        placeholder="Write what's on your mind..."
        rows="6"
        className="bg-white p-2 border-2 border-primary mt-10 rounded-md w-full"
      ></textarea>
      <button
        onClick={saveButtonHandler}
        className="bg-primary rounded-md drop-shadow-sm w-full mt-4 text-center text-white font-bold hover:bg-opacity-80 py-2 "
      >
        Save
      </button>
      <DialogBox
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title="Are you sure? To delete this picture!"
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
            onClick={(e) => deleteImageHandler(e)}
            className="text-center py-2 px-11 bg-danger text-white rounded-md outline-none"
          >
            Yes
          </button>
        </div>
      </DialogBox>
    </div>
  );
};

export default EditPostItem;
