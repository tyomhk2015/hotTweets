import React, { useState } from 'react';
import {authService} from '../firebase_assets';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUnregistered, setIsUnregistered] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {target: {name, value}} = event;

    if(name === 'email') {
      setEmail(value);
    } else if(name === 'password') {
      setPassword(value);
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    let accountData;
    try {
      if (isUnregistered) {
        accountData = await authService.createUserWithEmailAndPassword(email, password);
        console.log('create',accountData);
      } else {
        accountData = await authService.signInWithEmailAndPassword(email, password)
        console.log('sign in',accountData);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  const toggleAccount = () => setIsUnregistered((prev) => !prev);

  return (
    <div>
      <h3>Auth</h3>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="E-mail" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input type="submit" value={isUnregistered ? "Sign Up" : "Log In"} />
        {error ? <p>{error}</p> : null}
      </form>
      <span onClick={toggleAccount}>
        {isUnregistered ?  "Sign Up" : "Log In"}
      </span>
      <div>
        <button>Login w/ Google</button>
        <button>Login w/ Github</button>
      </div>
    </div>
  );
}

export default Auth;
