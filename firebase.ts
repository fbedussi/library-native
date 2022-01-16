import 'firebase/firestore'

import firebase from 'firebase'

// Initialize Cloud Firestore through Firebase
const config = {
	apiKey: "AIzaSyBVs58jmNbv4ycc1zXHnWAqmmrCIu-cYKU",
	authDomain: "library-native-d7abf.firebaseapp.com",
	projectId: "library-native-d7abf",
	storageBucket: "library-native-d7abf.appspot.com",
	messagingSenderId: "230973004906",
	appId: "1:230973004906:web:65557dafd94d003bbe3e13",
}
firebase.initializeApp(config);


var db = firebase.firestore();
// var db = {};

db.enablePersistence().catch(function (err: any) {
	console.error(err);
	if (err.code === 'failed-precondition') {
		// Multiple tabs open, persistence can only be enabled
		// in one tab at a a time.
		// ...
	} else if (err.code === 'unimplemented') {
		// The current browser does not support all of the
		// features required to enable persistence
		// ...
	}
});

export const firebaseLogin = (username: string, password: string) => {
	return firebase.auth().signInWithEmailAndPassword(username, password);
};

export const firebaseLogout = () => {
	return firebase.auth().signOut()
};


export const storage = firebase.storage().ref();

export type UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
// export type UploadTaskSnapshot = any;

export default db;
