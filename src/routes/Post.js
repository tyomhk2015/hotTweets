import React, { useState } from 'react';
import { dbService, storageService } from "firebase_assets";

function Post({post, isOwner}) {
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(post.text);

  const deletePost = async () => {
    const consent = window.confirm("Will you delete this post?");
    if(consent) {
      // Delete the post
      await dbService.doc(`posts/${post.id}`).delete();
      // Delete the photo that is attached to this post.
      await storageService.refFromURL(post.image).delete();
    }
  }

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  }

  const updateText = (event) => {
    setPostText(event.target.value);
  }

  const updatePost = async (event) => {
    event.preventDefault();
    await dbService.doc(`posts/${post.id}`).update({
      text: postText,
    });
    setIsEditing((prev) => !prev);
  }

  return (
  <li>
    { isEditing ? (
      <>
        <form onSubmit={updatePost}>
          <input text="text" placeholder="Edit your message" value={postText} onChange={updateText} required />
          <input type="submit"value="Update"/>
        </form>
        <button onClick={toggleEditing}>Cancel</button>
      </>
    ) : (
      <>
        <p>{post.text}</p>
        {post.image && (
          <img src={post.image} width="40px" height="40px" alt={`${post.id}'s attachment.`} />
        )}
        {isOwner && (
          <>
            <button onClick={deletePost}>Delete</button>
            <button onClick={toggleEditing}>Edit</button>
          </>
        )}
      </>
    )}
  </li>
  );
}

export default Post;
