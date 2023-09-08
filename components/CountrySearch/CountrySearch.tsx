import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../layouts/LayoutDefault/context";
import { CountryDialog } from "../CountryDialog/CountryDialog";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";
import { IConfiguredData } from "./CountrySearch.types";

export function CountrySearch() {
  const { isSearchDialogOpen, setIsSearchDialogOpen, currentUser } =
    useGlobalContext();
  const [allCountries, setAllCountries] = useState<IConfiguredData[]>();
  const getAllCountries = async () => {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data: ICountryData[] = await res.json();
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
    const configuredData = data.map((item) => ({
      label: item.name.common,
      link: item.cca3,
    }));

    setAllCountries(configuredData);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const handleClose = () => {
    setIsSearchDialogOpen(false);
  };

  if (!allCountries) {
    return null;
  }
  return (
    <CountryDialog
      open={isSearchDialogOpen}
      handleClose={handleClose}
      header={null}
      content={
        <Autocomplete
          disablePortal
          id="combo-box"
          options={allCountries}
          sx={{ width: "auto", height: "auto" }}
          onChange={(event: any, option: any) => {
            window.location.href = option.link;
          }}
          renderInput={(params) => <TextField {...params} label="Search" />}
          fullWidth
        />
      }
      maxWidth={"xl"}
    />
  );
}
