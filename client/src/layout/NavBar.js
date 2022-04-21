import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DialogBox from '../components/DialogBox';
import SearchTerm from '../components/SearchTerm';
import WritePost from '../components/WritePost';

const Navigation = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isWrite, setIsWrite] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const user = useSelector((state) => state.loginUser.login);
  const baseURL = useSelector((state) => state.baseURL);
  const profileImage =
    user && user.avatar
      ? `url('${baseURL}/${user.avatar}')`
      : `url('${baseURL}/images/1defaults/profile.jpg')`;
  const isWriteButtonHandler = () => {
    setIsWrite(true);
    navigate(`/${user?.id && user.username}`);
  };
  const navigateHome = () => {
    navigate(`/${user?.id && user.username}`);
  };
  const navigateTo = (path) => {
    navigate(`/${params.username}` + path);
  };

  return (
    <div className="bg-light bg-opacity-95 z-30 p-2 flex flex-col rounded-br-md rounded-bl-md sticky top-0  drop-shadow-sm">
      <div className="flex">
        <div
          onClick={() => navigateHome()}
          className="rounded-md mr-3 drop-shadow-sm w-[45px] h-[45px] bg-white cursor-pointer"
          style={{
            backgroundImage: profileImage,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div
          onClick={isWriteButtonHandler}
          className="flex-1 bg-white rounded-md p-2 text-gray-light drop-shadow-sm border-primary border-2"
        >
          Write what's on your mind...
        </div>

        {isWrite ? (
          <div
            onClick={() => setIsWrite(false)}
            className="cursor-pointer drop-shadow-sm flex justify-center items-center  w-[45px] h-[45px] bg-primary text-white rounded-md ml-3 text-xl"
          >
            <i className="fa-solid fa-square-xmark text-light"></i>
          </div>
        ) : (
          <div
            onClick={() => setIsSearch(true)}
            className="search drop-shadow-sm flex justify-center items-center  w-[45px] h-[45px] bg-primary text-white rounded-md ml-3 cursor-pointer"
          >
            <i className="fa-solid fa-magnifying-glass text-white"></i>
          </div>
        )}
      </div>
      <div className="grid grid-cols-4 gap-1 text-sm md:gap-2 md:text-md text-center">
        <div
          onClick={() => navigateTo(``)}
          className={`px-2 py-1 mt-2 rounded-md drop-shadow-sm duration-300 cursor-pointer bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <i className="fa-solid fa-signs-post"></i> Posts
        </div>
        <div
          onClick={() => navigateTo(`/photos`)}
          className={`px-2 py-1 mt-2 rounded-md drop-shadow-sm duration-300 cursor-pointer bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <i className="fa-solid fa-photo-film"></i> Photos
        </div>
        <div
          onClick={() => navigateTo(`/fans`)}
          className={`px-2 py-1 mt-2 rounded-md drop-shadow-sm duration-300 cursor-pointer bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <i className="fa-solid fa-people-group"></i> Fans
        </div>
        <div
          onClick={() => navigateTo(`/profile`)}
          className={`px-2 py-1 mt-2 rounded-md drop-shadow-sm duration-300 cursor-pointer bg-white text-primary hover:bg-primary hover:text-white`}
        >
          <i className="fa-solid fa-user"></i> Profile
        </div>
      </div>
      <DialogBox
        isOpen={isWrite}
        onCloseModal={() => setIsWrite(false)}
        title="Feel free to post anything you like."
      >
        <div className="mb-6  min-w-[350px] md:min-w-[600px]">
          <div
            onClick={() => setIsWrite(false)}
            className="absolute top-3 z-50 right-3 cursor-pointer drop-shadow-sm flex justify-center items-center  w-[25px] h-[25px] rounded-md ml-3 text-xl"
          >
            <i className="fa-solid fa-square-xmark text-danger text-opacity-70"></i>
          </div>
          <WritePost closeExpand={() => setIsWrite(false)} />
        </div>
      </DialogBox>
      <DialogBox
        isOpen={isSearch}
        onCloseModal={() => setIsSearch(false)}
        title="Search someone you know!"
      >
        <div className="min-w-[350px] md:min-w-[600px]">
          <div
            onClick={() => setIsSearch(false)}
            className="absolute top-3 z-50 right-3 cursor-pointer drop-shadow-sm flex justify-center items-center  w-[25px] h-[25px] rounded-md ml-3 text-xl"
          >
            <i className="fa-solid fa-square-xmark text-danger text-opacity-70"></i>
          </div>
          <SearchTerm clickHandler={() => setIsSearch(false)} />
        </div>
      </DialogBox>
    </div>
  );
};

export default Navigation;
