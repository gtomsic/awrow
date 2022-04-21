import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  actionCancelPhotos,
  actionCreatePostItem,
  actionPreparePhotos,
} from '../actions/actionPosts';
import BoxesFive from './boxes/BoxesFive';
import BoxesFour from './boxes/BoxesFour';
import BoxesThree from './boxes/BoxesThree';
import BoxesTwo from './boxes/BoxesTwo';
import BoxOne from './boxes/BoxOne';
import Spinner from './Spinner';

const WritePost = ({ closeExpand }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState(null);
  const [body, setBody] = useState('');
  const user = useSelector((state) => state.loginUser.login);
  const { loading, photos, error } = useSelector((state) => state.postPhotos);
  const { loading: postLoading, error: postError } = useSelector(
    (state) => state.createdPost
  );
  const postBody = localStorage.getItem('postBody')
    ? JSON.parse(localStorage.getItem('postBody'))
    : null;
  useEffect(() => {
    setBody(postBody);
    if (photos && photos[0]?.images) {
      setImages(photos);
    } else {
      setImages(null);
    }
  }, [photos, postBody]);

  const onChangeImagesHandler = (e) => {
    e.preventDefault();
    setImages(e.target.files);

    const data = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      data.append('images', e.target.files[i]);
    }
    data.append('text', 'Gabriel Tomsic');
    dispatch(actionPreparePhotos(data));
    localStorage.setItem('postBody', JSON.stringify(body || ''));
  };
  const buttonCancelHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImages(null);
    dispatch(actionCancelPhotos(photos));
    closeExpand();
  };

  const onSubmitCreatePostHandler = async () => {
    if (body && body.length < 1 && photos.length < 0) {
      return;
    } else {
      await dispatch(actionCreatePostItem({ body, photos }));
      navigate(`/${user.username}`);
      setBody('');
      closeExpand();
    }
  };

  const renderedBoxed = () => {
    if (Number(photos.length) >= 5) {
      return <BoxesFive photos={photos} />;
    }
    if (Number(photos.length) === 4) {
      return <BoxesFour photos={photos} />;
    }
    if (Number(photos.length) === 3) {
      return <BoxesThree photos={photos} />;
    }
    if (Number(photos.length) === 2) {
      return <BoxesTwo photos={photos} />;
    }
    if (Number(photos.length) === 1) {
      return <BoxOne photos={photos} />;
    }
  };

  return (
    <div className="rounded-md flex-1 max-w-[600px]">
      {postError && <div className="p-3 text-danger">{postError}</div>}
      {postLoading ? (
        <Spinner>Wait while try to create new post...</Spinner>
      ) : (
        <div className="relative flex flex-col  px-0 md:px-0">
          <textarea
            autoFocus={true}
            value={body || ''}
            onChange={(e) => setBody(e.target.value)}
            name="body"
            placeholder="Write what's on your mind..."
            rows="4"
            className="relative bg-white p-2 border-2 border-primary rounded-md outline-none"
          ></textarea>

          {loading ? (
            <Spinner>Loading images ...</Spinner>
          ) : photos[0]?.images ? (
            renderedBoxed()
          ) : error ? (
            <div className="p-3 text-danger">{error}</div>
          ) : null}

          <div className="grid grid-cols-2 gap-2 mx-2 mt-2">
            {images ? (
              <button
                onClick={buttonCancelHandler}
                className="bg-secondary text-white font-bold hover:bg-opacity-80 py-1 rounded-md"
              >
                Cancel
              </button>
            ) : (
              <div className="relative w-full group h-[40px] flex justify-center items-center ">
                <div className="absolute bg-gray bg-opacity-50 justify-center w-full h-full items-center flex  group-hover:bg-dark group-hover:bg-opacity-80 group-hover:duration-300 rounded-md">
                  <i className=" fa-solid text-xl text-light fa-camera"></i>
                </div>
                <input
                  onChange={onChangeImagesHandler}
                  type="file"
                  name="images"
                  accept=".png, .jpg, .JPEG"
                  className="h-full absolute w-full rounded-full overflow-hidden cursor-pointer"
                  multiple
                />
              </div>
            )}
            <button
              onClick={onSubmitCreatePostHandler}
              className="bg-primary text-white font-bold hover:bg-opacity-80 py-1 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WritePost;
