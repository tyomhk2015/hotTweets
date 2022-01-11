import { HashRouter, Router, Route, Routes } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";


const AppRouter = (props) => {
  return (
  <HashRouter base="/">
    {props.isLoggedIn && <Navigation user={props.user}/>}
    <Routes>
      {props.isLoggedIn ? (
        <>
          <Route exact path="/" element={<Home user={props.user}/>} />
          <Route exact path="/profile" element={<Profile user={props.user} refreshUser={props.refreshUser} />} />
        </>
      ) : 
        <Route exact path="/" element={<Auth />} />
      }
    </Routes>
  </HashRouter>
  );
}

export default AppRouter;