import React, { useState } from 'react';
import { dbService } from "firebase_assets";

function Home() {
  const [post, setPost] = useState('');
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('posts').add({
      post,
      createdDate: Date.now()
    });
    setPost('');
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
