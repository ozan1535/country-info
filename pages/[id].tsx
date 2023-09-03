import { Box, Grid, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { CountryComments } from "../components/CountryComments/CountryComments";
import { CountryDialog } from "../components/CountryDialog/CountryDialog";
import { CountryImage } from "../components/CountryImage/CountryImage";
import CountryMoreInfo from "../components/CountryMoreInfo/CountryMoreInfo";
import { CountryTable } from "../components/CountryTable/CountryTable";
import { LoginMessage } from "../components/LoginMessage/LoginMessage";
import { PageHead } from "../components/PageHead/PageHead";
import { getCountryInfo } from "../helpers";
import { useGlobalContext } from "../layouts/LayoutDefault/context";
import { getLayoutDefault } from "../layouts/LayoutDefault/LayoutDefault";
import { ICountryData } from "../layouts/LayoutDefault/LayoutDefault.types";
import { firebaseDatabase } from "../services/firebase";

export default function CountryInformation({ data }: { data: ICountryData }) {
  const { currentUser } = useGlobalContext();

  const countryInfo = getCountryInfo(data);
  const [value, setValue] = useState("");
  const [hasNewComment, setHasNewComment] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    const randomId = self.crypto.randomUUID();
    setHasNewComment(true);

    const user = doc(
      firebaseDatabase,
      `users/${currentUser?.uid}/comments/${randomId}`
    );
    const document = doc(
      firebaseDatabase,
      `countries/${router.query.id}/comments/${randomId}`
    );

    if (value.length > 0) {
      await setDoc(document, {
        uid: currentUser?.uid,
        name: currentUser?.displayName,
        photo: currentUser?.photoURL,
        comment: value,
        timestamp: serverTimestamp(),
      });
      await setDoc(user, {
        uid: currentUser?.uid,
        comment: value,
        country: router.query.id,
        timestamp: serverTimestamp(),
        countryName: data?.name?.common,
      });
    }
    setValue("");
  };

  return (
    <div>
      <PageHead
        title={`Country Insight - ${data.name.common}`}
        content={`Country Insight for ${data.name.common}`}
      />

      <Typography
        variant="h2"
        align="center"
        marginBottom={5}
        sx={{ fontWeight: "bold" }}
      >
        {countryInfo.names[0].name} {data.flag}
      </Typography>
      <CountryImage countryName={countryInfo.names[0].name as string} />

      <Grid
        container
        justifyContent={"center"}
        columns={20}
        gap={2}
        wrap={"wrap"}
        width={"100%"}
      >
        <CountryTable name="Name" data={countryInfo.names} />
        <CountryTable
          name="Geography"
          data={countryInfo.geography}
          countryName={countryInfo.names[0].name as string}
        />
        <Grid item direction={"column"} xs={18} sm={9} md={6} lg={5} xl={5}>
          <CountryTable name="Languages" data={countryInfo.languages} />
          <CountryTable name="Currency" data={countryInfo.currency} />
        </Grid>
        <CountryTable name="Codes" data={countryInfo.codes} />
      </Grid>

      <CountryMoreInfo countryName={countryInfo.names[0].name as string} />
      <CountryDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        header={<div>Log in Required</div>}
        content={<LoginMessage setOpenDialog={setOpenDialog} />}
        maxWidth={"sm"}
      />
      <Box sx={{ m: 2 }}>
        <CountryComments
          hasNewComment={hasNewComment}
          setHasNewComment={setHasNewComment}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Share your experience"
          multiline
          fullWidth
          minRows={4}
          sx={{ mt: "1rem" }}
          value={value}
          onChange={(a) => setValue((a.target as HTMLInputElement).value)}
        />
        <Button
          sx={{ my: 1 }}
          variant="contained"
          onClick={currentUser ? handleClick : () => setOpenDialog(true)}
          disabled={value.length < 5}
        >
          Share
        </Button>
      </Box>
    </div>
  );
}

CountryInformation.getLayout = getLayoutDefault;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${context.query.id}`
  );
  const data = await res.json();
  console.log(data, "xddxdxxdx");

  if (data.status === 404 || data.status === 400) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
      props: {},
    };
  }

  return { props: { data: data[0] } };
};
