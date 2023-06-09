import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCQxy02G1PIvqKgyuamuxhe6Cy8Eby22wI",
    authDomain: "kiwanis-international.firebaseapp.com",
    databaseURL: "https://kiwanis-international-default-rtdb.firebaseio.com",
    projectId: "kiwanis-international",
    storageBucket: "kiwanis-international.appspot.com",
    messagingSenderId: "259228438944",
    appId: "1:259228438944:web:6818a5ed20878ea98c94c5",
    measurementId: "G-XQR73SHB6R"
};
 
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);