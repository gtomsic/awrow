import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  actionBeFanOrRemove,
  actionFollowerCheckIfFanOf,
} from '../actions/actionFollowers';
import { actionUpdateProfileInfo } from '../actions/actionUsers';
import DialogBox from './DialogBox';
import Settings from './Settings';

const ProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [beFan, setBeFan] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [civil, setCivil] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [hobbies, setHobies] = useState('');
  const [about, setAbout] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  const loginUser = useSelector((state) => state.loginUser.login);
  const userInfo = useSelector((state) => state.userInfo.profile);
  const user =
    loginUser?.id && loginUser.username !== params.username
      ? userInfo
      : loginUser;
  const auth = loginUser?.username === params.username;
  const fanOfUser = useSelector((state) => state.fanOfUser.user);
  useEffect(() => {
    if (loginUser?.id) {
      dispatch(
        actionFollowerCheckIfFanOf({
          followed_id: params.username,
          user_id: loginUser?.id && loginUser.id,
        })
      );
    }
  }, [dispatch, loginUser, params]);
  useEffect(() => {
    if (fanOfUser?.id) {
      setBeFan(true);
    } else {
      setBeFan(false);
    }
  }, [fanOfUser]);
  const beFanOrRemoveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const data = {
      followed_id: params.username,
      user_id: loginUser.id,
    };
    dispatch(actionBeFanOrRemove(data));
    setIsOpen(false);
  };
  const editModeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(true);
    setName(user.name);
    setCivil(user.civil);
    setSex(user.sex);
    setCity(user.city || '');
    setState(user.state || '');
    setCountry(user.country || '');
    setHobies(
      user.hobbies || 'Social Network, Traveling, Cars, Default Hobbies'
    );
    setAbout(user.about || '');
  };
  const updateInfoHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(false);
    const data = {
      name,
      civil,
      sex,
      city,
      state,
      country,
      hobbies,
      about,
    };
    if (name.length < 6 || civil.length < 5 || sex.length < 3) {
      return;
    } else {
      dispatch(actionUpdateProfileInfo(data, user.token));
    }
  };

  return (
    <div className="ralative mt-5 pb-11 px-3 md:px-0">
      <div className="py-2 font-bold text-xl  grid grid-cols-2">
        <div className="py-1 px-4 text-primary">
          <i className="fa-solid fa-user"></i> Info
        </div>
        {auth ? (
          <div className="flex justify-end">
            {editMode ? (
              <button
                onClick={updateInfoHandler}
                className="py-1 px-7 text-xl font-bold text-white bg-primary hover:bg-opacity-80 duration-300 drop-shadow-sm rounded-md"
              >
                Save
              </button>
            ) : (
              <button
                onClick={editModeHandler}
                className="py-1 px-7 text-xl drop-shadow-sm text-white font-bold bg-primary bg-opacity-50  hover:bg-opacity-80 duration-300 rounded-md"
              >
                Edit
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-end">
            {beFan ? (
              <button
                onClick={() => setIsOpen(true)}
                className="py-1 px-4 text-xl font-bold text-light bg-primary bg-opacity-50 hover:bg-opacity-95 duration-300 drop-shadow-sm rounded-md"
              >
                <i className="fa-solid fa-user-minus"></i> Remove Me
              </button>
            ) : (
              <button
                onClick={beFanOrRemoveHandler}
                className="py-1 px-4 text-xl drop-shadow-sm text-white bg-positive font-bold bg-opacity-50 hover:bg-opacity-95 duration-300 rounded-md"
              >
                <i className="fa-solid fa-user-plus"></i> Be Fan
              </button>
            )}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {editMode ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            placeholder="Name"
            type="text"
            className="bg-white p-2 border-2 border-primary rounded-md capitalize"
          />
        ) : (
          <div className=" bg-light bg-opacity-40 p-2 flex justify-between">
            <span>Name:</span>{' '}
            <span className="font-bold text-primary">{user && user.name}</span>
          </div>
        )}
        <div className=" bg-light bg-opacity-40 p-2 flex justify-between">
          <span>Username:</span>{' '}
          <span className="font-bold text-primary">
            {user && user.username}
          </span>
        </div>
        {auth && (
          <div className=" bg-light bg-opacity-40 p-2 flex justify-between">
            <span>Email:</span>{' '}
            <span className="font-bold text-primary">{user && user.email}</span>
          </div>
        )}
        {editMode ? (
          <input
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            name="sex"
            placeholder="Sex"
            type="text"
            className="bg-white p-2 border-2 border-primary rounded-md capitalize"
          />
        ) : (
          <div className=" bg-light bg-opacity-40 p-2 flex justify-between capitalize">
            <span>Sex:</span>{' '}
            <span className="font-bold text-primary">{user && user.sex}</span>
          </div>
        )}
        {editMode ? (
          <input
            value={civil}
            onChange={(e) => setCivil(e.target.value)}
            name="civil"
            placeholder="Civil"
            type="text"
            className="bg-white p-2 border-2 border-primary rounded-md capitalize"
          />
        ) : (
          <div className=" bg-light bg-opacity-40 p-2 flex justify-between capitalize">
            <span>Status:</span>{' '}
            <span className="font-bold text-primary">{user && user.civil}</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <div className="p-2 font-bold text-xl text-primary">Location</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          {editMode ? (
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              name="city"
              placeholder="City"
              type="text"
              className="bg-white p-2 border-2 border-primary rounded-md capitalize"
            />
          ) : (
            <div className=" bg-light bg-opacity-40 p-2 flex justify-between capitalize">
              <span>City:</span>{' '}
              <span className="font-bold text-primary">
                {user && user.city}
              </span>
            </div>
          )}
          {editMode ? (
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              name="state"
              placeholder="State"
              type="text"
              className="bg-white p-2 border-2 border-primary rounded-md capitalize"
            />
          ) : (
            <div className=" bg-light bg-opacity-40 p-2 flex justify-between capitalize">
              <span>State:</span>{' '}
              <span className="font-bold text-primary">
                {user && user.state}
              </span>
            </div>
          )}
          {editMode ? (
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              name="country"
              placeholder="Country"
              type="text"
              className="bg-white p-2 border-2 border-primary rounded-md capitalize"
            />
          ) : (
            <div className=" bg-light bg-opacity-40 p-2 flex justify-between capitalize">
              <span>Country:</span>{' '}
              <span className="font-bold text-primary">
                {user && user.country}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 min-h-[200px]">
        <div className="p-2 font-bold text-xl text-primary">
          <i className="fa-solid fa-heart"></i> Hobbies
        </div>
        <div className="grid grid-cols-1 mt-3">
          {editMode ? (
            <textarea
              value={hobbies}
              onChange={(e) => setHobies(e.target.value)}
              name="hobbies"
              placeholder="Add hobbies separted by commas ( , ) example, love sport, walking, traveling, etc,,,"
              rows="6"
              className="bg-white p-2 border-2 border-primary rounded-md capitalize"
            ></textarea>
          ) : user && user.hobbies ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {user.hobbies.split(',').map((hobby, index) => {
                return (
                  <div
                    key={index}
                    className="py-2 text-center border-primary border bg-white text-primary  drop-shadow-md"
                  >
                    {hobby}
                  </div>
                );
              })}
            </div>
          ) : (
            'Add hobbies separted by commas ( , ) example, love sport, walking, traveling, etc,,,'
          )}
        </div>
      </div>
      <div className="my-3 min-h-[200px]">
        <div className="p-2 font-bold text-xl text-primary">
          <i className="fa-solid fa-circle-info"></i> About Me
        </div>
        <div className="grid grid-cols-1 mt-3">
          {editMode ? (
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              name="about"
              placeholder="Tell something about yourself..."
              rows="9"
              className="bg-white p-2 border-2 border-primary rounded-md capitalize"
            ></textarea>
          ) : user && user.about ? (
            user.about
          ) : (
            'Tell something about yourself...'
          )}
        </div>
      </div>
      <div className="grid grid-cols-1">
        {editMode && (
          <button
            onClick={updateInfoHandler}
            className="py-2 px-4 text-white bg-primary hover:bg-opacity-80 duration-300 drop-shadow-sm rounded-sm text-xl font-bold"
          >
            Save
          </button>
        )}
      </div>
      {auth ? <Settings /> : null}
      <DialogBox
        isOpen={isOpen}
        onCloseModal={() => setIsOpen(false)}
        title={`Don't want to be a fan anymore?`}
      >
        <div className="p-4 mb-4">Please procceed to if you are sure?</div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setIsOpen(false)}
            className="text-center py-2 px-11 bg-gray text-white rounded-md outline-none"
          >
            Cancel
          </button>
          <button
            onClick={beFanOrRemoveHandler}
            className="text-center py-2 px-11 bg-danger text-white rounded-md outline-none"
          >
            Yes
          </button>
        </div>
      </DialogBox>
    </div>
  );
};

export default ProfileInfo;
