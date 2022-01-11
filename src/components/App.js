import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebase_assets';

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        // Create a simplified user object for React to track the objects' difference, so the component can be re-rendered.
        const userObj = {
          displayName: user.displayName,
          uid: user.id,
          updateProfile: (args) => user.updateProfile(args),
        };
        setUser(userObj);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const retrievedUser = authService.currentUser;
    const userObj = {
      displayName: retrievedUser.displayName,
      uid: retrievedUser.id,
      updateProfile: (args) => retrievedUser.updateProfile(args),
    };
    setUser(userObj);
  }

  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(user)} user={user} refreshUser={refreshUser}/> : <p>Loading...</p>}
    </>
  );
}

export default App;