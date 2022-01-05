import React, { useState } from 'react';

function Home() {
  const [post, setPost] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(post);
  }
  const onChange = (event) => {
    const {target: {value}} = event;
    setPost(value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input type='text' placeholder='Speak your mind!' maxLength={300} onChange={onChange}/>
      <input type='submit' value='Post'/>
    </form>
  );
}

export default Home;
