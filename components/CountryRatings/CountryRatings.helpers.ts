import { User } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { firebaseDatabase } from "../../services/firebase";

export const handleClick = async (
  e: any,
  currentUser: User,
  router: NextRouter,
  setRating: Dispatch<SetStateAction<number>>
) => {
  const user = doc(
    firebaseDatabase,
    `users/${currentUser?.uid}/stars/${router.query.id}`
  );
  const document = doc(
    firebaseDatabase,
    `countries/${router.query.id}/stars/${currentUser?.uid}`
  );

  if (e?.target?.value) {
    await setDoc(document, {
      uid: currentUser?.uid,
      name: currentUser?.displayName,
      star: e?.target?.value,
      timestamp: serverTimestamp(),
    });
    await setDoc(user, {
      uid: currentUser?.uid,
      star: e?.target?.value,
      timestamp: serverTimestamp(),
    });
    setRating(+e?.target?.value);
  }
};
