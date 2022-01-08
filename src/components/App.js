import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebase_assets';

function App() {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={Boolean(user)} user={user} /> : <p>Loading...</p>}
    </>
  );
}

export default App;