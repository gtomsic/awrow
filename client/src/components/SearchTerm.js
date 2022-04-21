import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionSearchUsers } from '../actions/actionUsers';
import UserCard from './UserCard';

const SearchTerm = ({ clickHandler }) => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [debounceTerm, setDebounceTerm] = useState(term);
  const users = useSelector((state) => state.userResults.users);
  useEffect(() => {
    if (term) {
      const timerId = setTimeout(() => {
        setDebounceTerm(term);
      }, 500);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [dispatch, term]);
  useEffect(() => {
    if (!debounceTerm) {
      return;
    }
    dispatch(actionSearchUsers(debounceTerm));
  }, [dispatch, debounceTerm]);
  return (
    <div className="w-full mb-6">
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        type="text"
        name="term"
        className="rounded-md border-2 border-primary drop-shadow-md bg-white p-3 w-full"
      />
      <div className="mt-3 w-full max-h-[400px] overflow-y-scroll">
        {users?.length > 0 &&
          users?.map((user) => {
            return (
              <UserCard
                user={user}
                key={user.id}
                clickHandler={() => clickHandler()}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SearchTerm;
