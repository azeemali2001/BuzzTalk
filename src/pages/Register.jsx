import React from 'react'
import '../style.scss';
import addAvatar from '../img/addAvatar.png'
import { useState } from 'react';

import { auth , storage , db} from '../firebase';

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from "firebase/firestore"; 

import { useNavigate , Link} from 'react-router-dom';


function Register() {

  const [err, setErr] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, `${displayName}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {

            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {})
            Navigate('/');
          } catch (err) {
            setError(err)
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setErr(true);
      setLoading(false);
    }
  };
  

  return (
    <div className="formContainer">
      <div className="formWrapper">

        <span className="logo">Buzz Talk</span>
        <span className="title">Register</span>

        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <input required style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={addAvatar} alt="" />
            <span>Add an avatar</span>
          </label>

          <button disabled={loading}>Sign up</button>

          {loading && <span style={{color:'lightgrey'}}>"Uploading the image please wait..."</span>}
          
          {err && <span style={{color:'lightgrey'}}>{error}</span>}

        </form>

        <p>
          You do have an account? <Link to='/login'>Login</Link>
        </p>

      </div>
    </div>
  )
}

export default Register