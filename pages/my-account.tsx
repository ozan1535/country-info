import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { PageHead } from "../components/PageHead/PageHead";
import { useGlobalContext } from "../layouts/LayoutDefault/context";
import { getLayoutDefault } from "../layouts/LayoutDefault/LayoutDefault";
import { firebaseDatabase } from "../services/firebase";
import { CountryDialog } from "../components/CountryDialog/CountryDialog";

export default function MyAccount() {
  const { currentUser } = useGlobalContext();
  const [userComments, setUserComments] = useState<Record<string, any>[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleComment, setSingleComment] = useState<null | Record<
    string,
    any
  >>(null);
  const [isDelete, setIsDelete] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const requestToServer = useCallback(async () => {
    let comments: Record<string, any>[] = [];
    const querySnapshot = await getDocs(
      query(
        collection(
          firebaseDatabase,
          "users",
          `${currentUser?.uid}`,
          "comments"
        ),
        orderBy("timestamp")
      )
    );
    querySnapshot.forEach((doc) => {
      comments.push({
        ...doc.data(),
        documentId: doc.id,
      });
    });
    setUserComments(comments);
  }, [currentUser?.uid]);

  useEffect(() => {
    requestToServer();
  }, [currentUser?.uid, isModalOpen, requestToServer]);

  const handleDelete = async () => {
    await deleteDoc(
      doc(
        firebaseDatabase,
        `users/${currentUser?.uid}/comments/${singleComment?.documentId}`
      )
    );
    await deleteDoc(
      doc(
        firebaseDatabase,
        `countries/${singleComment?.country}/comments/${singleComment?.documentId}`
      )
    );
    setIsModalOpen(false);
  };

  const handleUpdate = async () => {
    await updateDoc(
      doc(
        firebaseDatabase,
        `users/${currentUser?.uid}/comments/${singleComment?.documentId}`
      ),
      {
        comment: editedComment,
      }
    );
    await updateDoc(
      doc(
        firebaseDatabase,
        `countries/${singleComment?.country}/comments/${singleComment?.documentId}`
      ),
      {
        comment: editedComment,
      }
    );
  };
  console.log(userComments);

  return (
    <div>
      <PageHead title={"Country Insight - My Account"} content={"My Account"} />
      <CountryDialog
        open={isModalOpen}
        header={
          isDelete ? <div>Delete Comment</div> : <div>Update Comment</div>
        }
        handleClose={() => setIsModalOpen(false)}
        content={
          isDelete ? (
            <div>
              <p>
                Deleted comments cannot be reverted. Are you sure you want to
                delete?
              </p>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  sx={{ mr: "0.5rem" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="outlined" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Update comment"
                multiline
                fullWidth
                minRows={4}
                focused
                sx={{ m: "1rem 0" }}
                defaultValue={singleComment?.comment}
                onChange={(a) =>
                  setEditedComment((a.target as HTMLInputElement).value)
                }
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  sx={{ mr: "0.5rem" }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    handleUpdate();
                    setIsModalOpen(false);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          )
        }
        maxWidth={"sm"}
      />
      <div style={{ margin: "1rem" }}>
        <p>
          Hello, <b>{currentUser?.displayName}</b>
        </p>
      </div>
      <h4 style={{ margin: "1rem" }}>Edit or delete your comments</h4>
      {userComments?.map((comment, index) => (
        <Paper style={{ padding: "1rem", margin: "1rem" }} key={index}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={currentUser?.photoURL || ""} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: 0,
                }}
              >
                <div>
                  <h4 style={{ margin: 0, textAlign: "left" }}>
                    {currentUser?.displayName}
                  </h4>
                  <b>{comment?.countryName}</b>
                </div>
                <div>
                  <Edit
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsDelete(false);
                      setIsModalOpen(true);
                      setSingleComment(comment);
                    }}
                  />
                  <Delete
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsModalOpen(true);
                      setSingleComment(comment);
                      setIsDelete(true);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <p style={{ textAlign: "justify" }}>{comment.comment}</p>
                {comment.timestamp?.seconds &&
                  comment.timestamp?.nanoseconds && (
                    <p style={{ color: "grey" }}>
                      {new Date(
                        comment.timestamp.seconds * 1000 +
                          comment.timestamp.nanoseconds / 1000000
                      ).toLocaleString()}
                    </p>
                  )}
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
      {!userComments.length && (
        <p style={{ margin: "1rem" }}>You don&apos;t have any comment</p>
      )}
    </div>
  );
}

MyAccount.getLayout = getLayoutDefault;
