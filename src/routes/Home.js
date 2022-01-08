import React, { useState, useEffect } from 'react';
import { dbService } from 'firebase_assets';
import Post from './Post';

function Home({ user }) {
  const [post, setPost] = useState('');
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    dbService
      .collection('posts')
      .orderBy('createdDate')
      .onSnapshot((snapshot) => {
        // Make a new array of posts when DB's status changes.
        const renewedPostArr = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPostsData(renewedPostArr);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('posts').add({
      text: post,
      createdDate: Date.now(),
      creator: user.uid,
    });
    setPost('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          placeholder='Speak your mind!'
          maxLength={300}
          onChange={onChange}
        />
        <input type='submit' value='Post' />
      </form>
      <ol>
        {postsData.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              isOwner={post.creator === user.uid}
            />
          );
        })}
      </ol>
    </>
  );
}

export default Home;
