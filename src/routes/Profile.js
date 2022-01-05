import { authService } from '../firebase_assets';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile () {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  }
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
