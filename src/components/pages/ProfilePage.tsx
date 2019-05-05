/** @jsx jsx */
import { jsx } from '@emotion/core';
import { FunctionComponent, useContext, Fragment } from 'react';
import UserContext from '../context/UserContext';

const ProfilePage: FunctionComponent = () => {
  const user = useContext(UserContext);
  return (
    <div>
      <h1>My Profile</h1>
      {user ? (
        <form>
          <h2>Readonly right now</h2>
          <label>
            username: <input value={user.data.username} readOnly />
          </label>
          <label>
            color: <input value={user.data.color} readOnly />
          </label>
        </form>
      ) : (
        <Fragment>...</Fragment>
      )}
    </div>
  );
};

export default ProfilePage;
