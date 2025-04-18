
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword,
     signOut} from 'firebase/auth';
import {addDoc, 
    collection,
     getFirestore} from 'firebase/firestore'
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBMbk437iLJ584lAMK4NMrXxOpO8p9klMU",
  authDomain: "netflix-clone-589b6.firebaseapp.com",
  projectId: "netflix-clone-589b6",
  storageBucket: "netflix-clone-589b6.firebasestorage.app",
  messagingSenderId: "249981773453",
  appId: "1:249981773453:web:dd79e0573936c1107a64c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email,
        });
    }catch (error) {
        console.log(error);
          toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};