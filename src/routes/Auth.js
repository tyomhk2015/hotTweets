import React, { useState } from 'react';
import { firebaseObj, authService } from '../firebase_assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faGoogle,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUnregistered, setIsUnregistered] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider; // Mandatory ingredient for authenticating with social accounts.

    if (name === 'Google') {
      // Sign In Popup w/ Google
      provider = new firebaseObj.auth.GoogleAuthProvider();
    } else if (name === 'Github') {
      // Sign In Popup w/ Github
      provider = new firebaseObj.auth.GithubAuthProvider();
    }

    // Invoke the pop up for signing in.
    await authService.signInWithPopup(provider);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isUnregistered) {
        await authService.createUserWithEmailAndPassword(email, password);
      } else {
        await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setIsUnregistered((prev) => !prev);

  return (
    <div className='authContainer'>
      <FontAwesomeIcon
        icon={faTwitter}
        color={'#04AAFF'}
        size='3x'
        style={{ marginBottom: 30 }}
      />
      <form onSubmit={onSubmit} className='container'>
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          value={email}
          required
          onChange={onChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={password}
          required
          onChange={onChange}
        />
        {error && <span className='authError'>{error}</span>}
        <input
          type='submit'
          className='authInput authSubmit'
          value={isUnregistered ? 'Create Account' : 'Sign In'}
        />
      </form>
      <span onClick={toggleAccount} className='authSwitch'>
        {isUnregistered ? 'Log In' : 'Sign Up'}
      </span>
      <div className='authBtns'>
        <button name='Google' className='authBtn' onClick={onSocialClick}>
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button name='Github' className='authBtn' onClick={onSocialClick}>
          <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
}

export default Auth;
