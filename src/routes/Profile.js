import React, { useState } from 'react';
import { authService } from '../firebase_assets';
import { useNavigate } from 'react-router-dom';

function Profile({ user, refreshUser }) {
  const [ displayName, setDisplayName ] = useState(user.displayName);
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const updateUserName = async (event) => {
    event.preventDefault();
    if(displayName !== user.displayName) {
      await user.updateProfile({
        displayName: displayName,
      });
      refreshUser();
    }
  };

  const changeName = (event) => {
    const { target : {value} } = event;
    setDisplayName(value);
  };

  return (
    <div className="routesWrapper">
      <div className="container">
        <form onSubmit={updateUserName} className="profileForm">
          <input
            type='text'
            className="formInput"
            autoFocus
            placeholder='Display Name'
            onChange={changeName}
            value={displayName}
            required
          />
          <input type='submit' className="formBtn" value='Update the name' />
        </form>
        <button className="formBtn cancelBtn logOut" onClick={onLogOutClick}>Log Out</button>
      </div>
    </div>
  );
}

export default Profile;