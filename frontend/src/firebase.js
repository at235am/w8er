import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
});

export const auth = app.auth();
export const db = app.firestore();

export const createRestaurantProfile = async (userAuth) => {
  if (!userAuth) return;

  const resRef = db.doc(`restaurants/${userAuth.uid}`);
  const snapShot = await resRef.get();

  if (!snapShot.exists) {
    try {
      await resRef.set({
        uid: userAuth.uid,
        restaurantName: "",
        address: "",
        phoneNumber: "",
        maxPartySize: 10,
      });
    } catch (e) {
      console.log("error creating res", e);
    }
  }

  return resRef;
};

export default app;
