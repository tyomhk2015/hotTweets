import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from '../firebase_assets';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : <p>Loading...</p>}
      <footer>&copy; Tyomhk</footer>
    </>
  );
}

export default App;