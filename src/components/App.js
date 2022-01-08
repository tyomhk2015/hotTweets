import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebase_assets';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} user={user} /> : <p>Loading...</p>}
      <footer>&copy; Tyomhk</footer>
    </>
  );
}

export default App;