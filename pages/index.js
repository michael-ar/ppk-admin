import React, { useEffect, useRef, useState } from 'react';
import getConfig from 'next/config';
import uuid from 'uuid/v4';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { firebase as firebaseConfig } from 'ppk/config';

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
      distance: data.get('distance'),
      duration: data.get('duration'),
    });
};

const logout = () => firebase.auth().signOut();

const NewRoute = () => (
  <React.Fragment>
    <form onSubmit={submitRoute}>
      <label>
        pub
        <input type={'text'} name={'pub'} />
      </label>
      <label>
        distance
        <input type={'text'} name={'distance'} />
      </label>
      <label>
        duration
        <input type={'text'} name={'duration'} />
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
      <input type={'text'} name={'email'} />
    </label>
    <label>
      password
      <input type={'password'} name={'password'} />
    </label>
    <input type={'submit'} value={'log in'} />
    <style jsx>
      {`
        input {
          width: 200px;
        }
      `}
    </style>
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
  return (
    <React.StrictMode>{session ? <NewRoute /> : <Login />}</React.StrictMode>
  );
};

export default App;
