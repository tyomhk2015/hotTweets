import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from '../firebase_assets';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(authService.currentUser);
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <footer>&copy; Tyomhk</footer>
    </>
  );
}

export default App;