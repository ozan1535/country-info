import { useEffect, useState } from "react";
import { Avatar, Grid, Paper } from "@mui/material";
import { CountryRatings } from "../CountryRatings/CountryRatings";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/router";
import { ICountryCommentsProp } from "./CountryComments.types";
import { getDocument } from "./CountryComments.helpers";

export function CountryComments({
  hasNewComment,
  setHasNewComment,
}: ICountryCommentsProp) {
  const router = useRouter();

  const [comments, setComments] = useState<DocumentData[]>();

  useEffect(() => {
    getDocument(router, setComments);
    setHasNewComment(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNewComment]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid container wrap="wrap" columns={4}>
          <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
            <h1>Comments</h1>
          </Grid>
          <Grid
            item
            xs={4}
            sm={4}
            md={1}
            lg={1}
            xl={1}
            justifyContent={"flex-end"}
          >
            <CountryRatings />
          </Grid>
        </Grid>
      </div>
      {comments?.map((comment) => (
        <Paper style={{ padding: "1rem", marginTop: "1rem" }} key={comment.id}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar alt="Remy Sharp" src={comment.photo || ""} />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>{comment.name}</h4>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ textAlign: "justify" }}>{comment.comment}</p>
                <p style={{ color: "grey" }}>{comment.date}</p>
              </div>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </>
  );
}
