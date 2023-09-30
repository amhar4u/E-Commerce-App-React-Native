import {initializeApp} from 'firebase/app';
// import {getAuth} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';
// import {getDatabase} from 'firebase/database';
// import {getStorage} from 'firebase/storage'



const firebaseConfig={
    apiKey: "AIzaSyAsw9Imi7-GOZbtJwhMzpIpNnXe_Ky8rOU",
    authDomain: "e-commerce-app-2dbea.firebaseapp.com",
    databaseURL: "https://e-commerce-app-2dbea-default-rtdb.firebaseio.com",
    projectId: "e-commerce-app-2dbea",
    storageBucket: "e-commerce-app-2dbea.appspot.com",
    messagingSenderId: "12890029823",
    appId: "1:12890029823:web:91a4615323012bf6a056ca",
    measurementId: "G-GJFHN4GFLM",
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);
// const database = getDatabase(app);
// const storage = getStorage(app);
export {app};