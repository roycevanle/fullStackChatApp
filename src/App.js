import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore'; // for db
import 'firebase/auth'; // for user atuh
import 'firebase/analytics';

// hooks to make it easier to work with firebase & react
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
  apiKey: "AIzaSyBReA8kMpWJqS1EEOBHp1kqPt8l3lJ7TDg",
  authDomain: "superchat-4a439.firebaseapp.com",
  projectId: "superchat-4a439",
  storageBucket: "superchat-4a439.appspot.com",
  messagingSenderId: "260263247546",
  appId: "1:260263247546:web:0ee9e97a8fc6caa3688c83",
  measurementId: "G-S7W2Q16L80"
})

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function App() {
  // when signed in, user is an object. when signed out, user is null.
  const [user] = useAuthState(auth);

  return (
    <div className ="App">
      <header>

      </header>

      <section>
        {/* ternary operator to show chatroom when signed in & signIn prompt when not */}
        {user ? <ChatRoom /> : <SignIn />} 
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return(
    <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
      <p>Do not violate the community guidelines or you will be banned for life!</p>
    </>
  );
}

// if there is a current user, we display the button to them with a onlcick to signout
function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {

  // DUMMY(1) useRef() is hook link ref prop to refer to our element <div>
  const dummy = useRef()

  // when user adds new message to chat, it creates a document in firebase collection w/ timestame & userid
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  // listen to updates to data in realtime w/ usecollection data hook.
  //  returns array of objects where each obj is the chat message in db
  const [messages] = useCollectionData(query, {idField: 'id'});

  // add a stateful value to our component. start with useState hook with empty string
  const[formValue, setFormValue] = useState('');

  const sendMessage = async(e) => {
    // normally when form submitted, it'll refresh the page, so we do this to stop it from happening
    e.preventDefault();

    // grab userid from currently signed in usr
    const { uid, photoURL } = auth.currentUser;

    // this will write a new doc ref to firestore
    // takes a javascript obj as argument w. values that we want to write to db
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    // sets the form back to blank
    setFormValue('');

    // we'll call scrollIntoView whenever a user sends a message
    dummy.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <>
    <main>
      {/* map over the array of msgs & for each msg, use dedicated chatMessage component that has keyprop of msg.id & passes doc data as message prop (value)*/}
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      {/* DUMMY(2) addds empty div below our chat messages. we reference this element w. 
        ref prop & connect to code w. usRref() hook */}
      <div ref={dummy}></div>
    </main>

    {/* event activator for onSubmit button. sendMessage is func that will write to firestore */}
    <form onSubmit={sendMessage}>
      {/* we bind state to form input. whenever user types into the form, it triggers the change event. listen to change and set the formValue state*/}
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice!"/>

      <button type="submit">🕊️</button>
    </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
