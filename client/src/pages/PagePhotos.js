import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { actionGetPhotosByAlbum } from '../actions/actionPhotos';
import { actionGetSingleUser } from '../actions/actionUsers';
import CreateAlbum from '../components/CreateAlbum';
import DialogBox from '../components/DialogBox';
import BoxesFive from '../components/photoFrames/BoxesFive';
import BoxesFour from '../components/photoFrames/BoxesFour';
import BoxesThree from '../components/photoFrames/BoxesThree';
import BoxesTwo from '../components/photoFrames/BoxesTwo';
import BoxOne from '../components/photoFrames/BoxOne';
import PhotoView from '../components/PhotoView';

const PagePhotos = () => {
  const params = useParams();
  const dispatch = useDispatch();
  let [index, setIndex] = useState(0);
  const loginUser = useSelector((state) => state.loginUser.login);
  const data = useSelector((state) => state.photosByAlbum.photos);
  const [photos, setPhotos] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [isPhoto, setIsPhoto] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const baseURL = useSelector((state) => state.baseURL);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    dispatch(actionGetSingleUser(params.username));
  }, [params, dispatch]);
  useEffect(() => {
    if (params.username === loginUser?.username) {
      setAuth(true);
    }
  }, [loginUser, setAuth, params]);
  const { photos: newAlbum } = useSelector((state) => state.photosCreateAlbum);
  useEffect(() => {
    if (newAlbum?.length > 0) {
      setIsCreate(false);
    }
  }, [newAlbum]);
  useEffect(() => {
    if (params?.username) {
      dispatch(actionGetPhotosByAlbum(params.username));
    }
  }, [dispatch, params]);
  const renderedPhotos = (album) => {
    const photos = data?.photos?.filter((photo) => photo.album === album);
    return photos?.map((photo, index) => (
      <div
        onClick={() => {
          setIndex(Number(index));
          setPhotos(photos);
          setIsOpen(true);
        }}
        key={photo.images}
        className="min-h-[150px]"
        style={{
          backgroundImage: `url('${baseURL}/${photo.images}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
    ));
  };
  const renderedBoxed = (album) => {
    const photos = data?.photos?.filter((photo) => photo.album === album);
    if (photos?.length > 0) {
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
    }
  };
  return (
    <>
      {!isPhoto ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-2 md:mx-0">
          {auth && (
            <div
              onClick={() => setIsCreate(true)}
              className="flex  my-3 gap-1 p-2 bg-primary rounded-md overflow-hidden h-[145px] md:h-[144px] justify-center items-center cursor-pointer"
            >
              <h3 className="font-bold text-light drop-shadow-sm">
                Create Album
              </h3>
            </div>
          )}

          {data?.albums?.map((item) => (
            <div key={item.album} className="h-full">
              <div
                onClick={() => setIsPhoto(item.album)}
                className="cursor-pointer"
              >
                {renderedBoxed(item.album)}
              </div>
              <div className="font-bold text-center capitalize">
                {item.album}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="px-4 md:px-0">
            <button
              onClick={() => setIsPhoto('')}
              className="p-3 mt-4  rounded-md mb-4 bg-primary bg-opacity-70 hover:bg-opacity-95 duration-300 text-white drop-shadow-sm w-full"
            >
              <i className="fa-solid fa-chevron-left"></i> Back
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mx-2 md:mx-0">
            {renderedPhotos(isPhoto)}
          </div>
        </div>
      )}

      <PhotoView
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        photos={photos}
        index={index}
      />

      <DialogBox
        title="Create New Album"
        isOpen={isCreate}
        onCloseModal={() => setIsCreate(false)}
      >
        <CreateAlbum />
      </DialogBox>
    </>
  );
};

export default PagePhotos;
