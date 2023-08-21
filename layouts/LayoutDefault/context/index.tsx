import {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { auth, firebaseDatabase } from "../../../services/firebase";
import { IContextProps } from "./context.types";

const initialState = {
  isSearchDialogOpen: false,
  setIsSearchDialogOpen: () => false,
  currentUser: null,
  setCurrentUser: () => null,
  googleSignIn: () => {},
  googleSignOut: () => {},
};

const GlobalContext = createContext<IContextProps>(initialState);

export function GlobalContextProvider(props: { children: ReactElement }) {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const googleSignOut = () => {
    signOut(auth);
  };

  const addNewUser = async () => {
    if (currentUser) {
      const docRef = doc(firebaseDatabase, "users", currentUser?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          name: currentUser.displayName,
          photo: currentUser.photoURL,
        });
      } else {
        await setDoc(doc(firebaseDatabase, "users", currentUser.uid), {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        addNewUser();
      }
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const context = {
    isSearchDialogOpen,
    setIsSearchDialogOpen,
    googleSignIn,
    googleSignOut,
    currentUser,
    setCurrentUser,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
