import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { firebaseDatabase } from "../../services/firebase";

export const getDocument = async (
  router: NextRouter,
  setComments: Dispatch<SetStateAction<DocumentData[] | undefined>>
) => {
  const data: DocumentData[] = [];

  const querySnapshot = await getDocs(
    query(
      collection(
        firebaseDatabase,
        "countries",
        router.query.id as string,
        "comments"
      ),
      orderBy("timestamp")
    )
  );
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  setComments(data);
};
