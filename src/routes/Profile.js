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
    <>
      <form onSubmit={updateUserName}>
        <input
          type='text'
          placeholder='Display Name'
          onChange={changeName}
          value={displayName}
          required
        />
        <input type='submit' value='Update the name' />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;


// const getMyPosts = async () => {
//   const retrievedPosts = await dbService
//     .collection('posts')
//     .where('creator', '==', user.uid)
//     .orderBy('createdDate')
//     .get();
//   retrievedPosts.docs.map((doc) => {
//     console.log(doc.data());
//     return null;
//   });
// };

// useEffect(() => {
//   getMyPosts();
// }, []);