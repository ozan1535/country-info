import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CountryDialog } from "../CountryDialog/CountryDialog";
import { ICountryInfo, ICountryMoreInfo } from "./CountryMoreInfo.types";

export default function CountryMoreInfo({ countryName }: ICountryMoreInfo) {
  const router = useRouter();

  const [countryInfo, setCountryInfo] = useState<ICountryInfo>();
  const [open, setOpen] = useState(false);

  async function getCountryInfo() {
    const request = await fetch(
      `https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&exintro&explaintext&redirects=1&titles=${countryName}`
    );

    const data = await request.json();

    setCountryInfo(data);
  }

  useEffect(() => {
    getCountryInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!countryInfo) {
    return null;
  }

  return (
    <div>
      {open ? (
        <CountryDialog
          open={open}
          handleClose={handleClose}
          header={
            <span>{Object.values(countryInfo?.query.pages)[0].title}</span>
          }
          content={
            <Typography
              gutterBottom
              dangerouslySetInnerHTML={{
                __html: Object.values(
                  countryInfo?.query.pages
                )[0].extract.replace(/(?:\r\n|\r|\n)/g, "<br /><br />"),
              }}
            />
          }
        />
      ) : (
        <Button
          variant="contained"
          sx={{ margin: "1rem" }}
          onClick={handleClickOpen}
        >
          Show more information about&nbsp;<b>{countryName}</b>
        </Button>
      )}
    </div>
  );
}
