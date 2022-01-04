import React, { useState } from 'react';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onChange = (event) => {
    const {target: {name, value}} = event;
    console.log(name, value);
    if(name === 'email') {
      setEmail(value);
    } else if(name === 'password') {
      setPassword(value);
    }
  }
  const onSubmit = (event) => {
    event.preventDefault();
  }
  return (
    <div>
      <h3>Auth</h3>
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="E-mail" value={email} required onChange={onChange}/>
        <input type="password" name="password" placeholder="Password" value={password} required onChange={onChange}/>
        <input type="submit" value="Login" />
      </form>
      <div>
        <button>Login w/ Google</button>
        <button>Login w/ Github</button>
      </div>
    </div>
  );
}

export default Auth;
