import React, { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import uuid from 'uuid/v4';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebase as firebaseConfig } from 'ppk/config';
import 'ppk/pages/index.css';

const { publicRuntimeConfig } = getConfig();
const { FIREBASE_API_KEY, FIREBASE_SENDER_ID } = publicRuntimeConfig;

const submitRoute = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  firebase
    .firestore()
    .collection('routes')
    .doc(uuid())
    .set({
      date: new Date('13/11/2018'),
      pub: data.get('pub'),
      distance: parseInt(data.get('distance'), 10),
      duration: data.get('duration'),
    });
};

const logout = () => firebase.auth().signOut();

const NewRoute = () => (
  <React.Fragment>
    <form onSubmit={submitRoute}>
      <label>
        pub
        <input type={'text'} name={'pub'} autoFocus required />
      </label>
      <label>
        distance
        <input type={'number'} name={'distance'} required />
      </label>
      <label>
        duration
        <input type={'text'} name={'duration'} required />
      </label>
      <label>
        date
        <input type={'date'} name={'date'} required />
      </label>
      <input type={'submit'} value={'submit'} />
    </form>
    <button onClick={logout}>log out</button>
  </React.Fragment>
);

const login = e => {
  e.preventDefault();
  const data = new FormData(e.target);
  firebase
    .auth()
    .signInWithEmailAndPassword(data.get('email'), data.get('password'));
};

const Login = () => (
  <form onSubmit={login}>
    <label>
      email
      <input type={'text'} name={'email'} autoFocus required />
    </label>
    <label>
      password
      <input type={'password'} name={'password'} required />
    </label>
    <input type={'submit'} value={'log in'} />
  </form>
);

const App = () => {
  const [session, setSession] = useState(null);
  const initialisedFirebase = useRef(false);
  useEffect(() => {
    if (!initialisedFirebase.current) {
      const config = {
        ...firebaseConfig,
        apiKey: FIREBASE_API_KEY,
        messagingSenderId: FIREBASE_SENDER_ID,
      };
      firebase.initializeApp(config);
      firebase.auth().onAuthStateChanged(user => setSession(user));
      initialisedFirebase.current = true;
    }
  });
  return <div>{session ? <NewRoute /> : <Login />}</div>;
};

export default () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
