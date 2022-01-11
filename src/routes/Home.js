import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'firebase_assets';
import { v4 as uuidv4 } from 'uuid';
import Post from './Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

function Home({ user }) {
  const [post, setPost] = useState('');
  const [postsData, setPostsData] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(null);

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

    let fileURL = '';

    // If there is attached file, uploadingFile, save the date_url of the image.
    if (!!uploadingFile) {
      // Just like adding a document in a collection.
      // Prepare a document for current user to store the file, w/ a random name, by getting reference from the firestore storage.
      const uploadingFileRef = storageService
        .ref()
        .child(`${user.uid}/${uuidv4()}`);
      // Settings for uploading a file in String.
      const response = await uploadingFileRef.putString(
        uploadingFile,
        'data_url'
      );
      // Get the proper download path for this attachment file.
      fileURL = await response.ref.getDownloadURL();
    }
    const postObj = {
      text: post,
      createdDate: Date.now(),
      creator: user.uid,
      image: fileURL,
    };

    // Register the current post.
    await dbService.collection('posts').add(postObj);

    // After submission is completed, empty the inputs for next posts.
    setPost('');
    setUploadingFile(null);
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPost(value);
  };

  const uploadFile = (event) => {
    // Take a file from the user and upload the file suitable for showing w/ URL.
    const {
      target: { files },
    } = event;
    const targetFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (event) => {
      // Put string of data URL of the picture in the state.
      const {
        currentTarget: { result },
      } = event;
      setUploadingFile(result);
    };
    fileReader.readAsDataURL(targetFile);
  };

  const cancelUploadingfile = () => {
    // Hide the attached file
    setUploadingFile(null);
  };
  return (
    <div className="routesWrapper">
      <div className="container">
        <form onSubmit={onSubmit} className='postForm'>
          <div className='postInput__container'>
            <input
              type='text'
              className='postInput__input'
              placeholder='Speak your mind!'
              maxLength={300}
              onChange={onChange}
            />
            <div className="postActions">
              <label htmlFor='attach-file' className='postInput__label'>
                <FontAwesomeIcon icon={faPlus} />
              </label>
              <input id="attach-file" type='file' accept='image/*' className="fileInput" onChange={uploadFile} />
              <input type='submit' value='&rarr;' className='postInput__arrow' />
              {uploadingFile && (
                <div className="postForm__attachment">
                  <img
                    src={uploadingFile}
                    style={{
                      backgroundImage: uploadingFile,
                    }}
                    alt="background"
                  />
                  <div className="postForm__clear" onClick={cancelUploadingfile}>
                    <span>Remove</span>
                    <FontAwesomeIcon icon={faTimes} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </form>
        <ol className="postListWrapper">
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
      </div>
    </div>
  );
}

export default Home;
