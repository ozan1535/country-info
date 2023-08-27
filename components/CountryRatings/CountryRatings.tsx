import Star from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useGlobalContext } from "../../layouts/LayoutDefault/context";
import { firebaseDatabase } from "../../services/firebase";
import { LoginMessage } from "../LoginMessage/LoginMessage";
import { CountryDialog } from "./../../components/CountryDialog/CountryDialog";
import { handleClick } from "./CountryRatings.helpers";
import styles from "./CountryRatings.module.css";

export function CountryRatings() {
  const { currentUser } = useGlobalContext();
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [allRatings, setAllRatings] = useState({
    rating: 0,
    count: 0,
  });

  const getUserRating = useCallback(async () => {
    if (currentUser?.uid) {
      const docRef = doc(
        firebaseDatabase,
        `users/${currentUser.uid}/stars/${router.query.id}`
      );
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRating(+docSnap.data().star || 0);
      } else {
        setRating(0);
      }
    } else {
      setRating(0);
    }
    const data: DocumentData[] = [];
    const docSnapAllStarsCollection = await getDocs(
      collection(
        firebaseDatabase,
        "countries",
        router.query.id as string,
        "stars"
      )
    );

    docSnapAllStarsCollection.forEach((doc) => {
      data.push(doc.data());
    });
    const AvgRating =
      data
        .map((item) => item.star)
        .reduce(function (accumulator, currentValue) {
          return accumulator + parseFloat(currentValue);
        }, 0) / data.length;

    setAllRatings((prev) => ({
      count: data.length,
      rating: AvgRating,
    }));
  }, [currentUser?.uid, router.query.id]);

  useEffect(() => {
    getUserRating();
  }, [getUserRating, rating]);

  return (
    <div className={styles["CountryRatings"]}>
      <CountryDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        header={<div>Log in Required</div>}
        content={<LoginMessage setOpenDialog={setOpenDialog} />}
        maxWidth={"sm"}
      />
      <div style={{ marginRight: "1rem" }}>
        <b>RATINGS</b>
        <br />
        <div className={styles["CountryRatings__Ratings"]}>
          <Star sx={{ color: "#FAAE00" }} fontSize="large" />
          <div>
            <span>
              <b style={{ color: "#FAAE00" }}>{allRatings.rating || 0}</b> / 5
            </span>
            <br />
            <span style={{ color: "grey" }}>{allRatings.count || 0}</span>
          </div>
        </div>
      </div>
      <div className={styles["CountryRatings__UserRating"]}>
        <b>YOUR RATING</b>
        <br />
        <Rating
          name="simple-controlled"
          value={rating || 0}
          onClick={
            currentUser
              ? (e) => handleClick(e, currentUser, router, setRating)
              : () => setOpenDialog(true)
          }
        />
      </div>
    </div>
  );
}
