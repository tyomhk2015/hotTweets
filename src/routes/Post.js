import React, { useState } from 'react';
import { dbService, storageService } from 'firebase_assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

function Post({ post, isOwner }) {
  const [isEditing, setIsEditing] = useState(false);
  const [postText, setPostText] = useState(post.text);

  const deletePost = async () => {
    const consent = window.confirm('Will you delete this post?');
    if (consent) {
      // Delete the post
      await dbService.doc(`posts/${post.id}`).delete();
      // Delete the photo that is attached to this post.
      await storageService.refFromURL(post.image).delete();
    }
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const updateText = (event) => {
    setPostText(event.target.value);
  };

  const updatePost = async (event) => {
    event.preventDefault();
    await dbService.doc(`posts/${post.id}`).update({
      text: postText,
    });
    setIsEditing((prev) => !prev);
  };

  return (
    <li className='post'>
      {isEditing ? (
        <>
          <form onSubmit={updatePost} className='container postEdit'>
            <input
              text='text'
              placeholder='Edit your message'
              value={postText}
              onChange={updateText}
              required
            />
            <input type='submit' className='formBtn' value='Update' />
          </form>
          <button onClick={toggleEditing} className='formBtn cancelBtn'>
            Cancel
          </button>
        </>
      ) : (
        <>
          <p>{post.text}</p>
          {post.image && (
            <img
              src={post.image}
              width='40px'
              height='40px'
              alt={`${post.id}'s attachment.`}
            />
          )}
          {isOwner && (
            <div className='post__actions'>
              <button onClick={deletePost}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <button onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </button>
            </div>
          )}
        </>
      )}
    </li>
  );
}

export default Post;
