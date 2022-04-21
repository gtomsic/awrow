import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  actionGetPhotosByAlbum,
  actionPhotosCreateAlbum,
} from '../actions/actionPhotos';
import Spinner from './Spinner';

const CreateAlbum = ({ closeExpand }) => {
  const dispatch = useDispatch();
  const [album, setAlbum] = useState('');
  const user = useSelector((state) => state.loginUser.login);
  const { loading, photos, error } = useSelector(
    (state) => state.photosCreateAlbum
  );
  useEffect(() => {
    if (photos && photos[0]?.images) {
      dispatch(actionGetPhotosByAlbum(user.username));
    }
  });

  const onChangeImagesHandler = (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      data.append('images', e.target.files[i]);
    }
    dispatch(actionPhotosCreateAlbum(data, album));
  };

  return (
    <div className=" rounded-md flex-1 min-w-[350px] md:min-w-[600px] mb-10">
      <div className="relative flex flex-col  px-2 md:px-0">
        <input
          autoFocus={true}
          value={album || ''}
          onChange={(e) => setAlbum(e.target.value)}
          name="album"
          placeholder="Album Title"
          className="relative bg-white p-2 border-2 border-primary rounded-md outline-none"
        />

        {loading && <Spinner>Loading images ...</Spinner>}
        {error && <div className="p3 text-danger">{error}</div>}

        <div className="grid grid-cols-2 gap-2  mt-2">
          <div className="relative w-full group flex justify-center items-center col-span-2 mt-4">
            <div className="absolute bg-primary bg-opacity-80 h-[35px] justify-center w-full  items-center flex  group-hover:bg-primary group-hover:bg-opacity-95 group-hover:duration-300 rounded-md">
              <i className=" fa-solid text-xl text-light fa-camera"></i>
            </div>
            <input
              onChange={onChangeImagesHandler}
              type="file"
              name="images"
              accept=".png, .jpg, .JPEG"
              className="absolute w-full rounded-full overflow-hidden cursor-pointer"
              multiple
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAlbum;
