import { IconButton, InputBase, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../layouts/LayoutDefault/context";
import { CountryCard } from "../CountryCard/CountryCard";
import { CountryDialog } from "../CountryDialog/CountryDialog";
import SearchIcon from "@mui/icons-material/Search";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";
import { countryDialog__Paper } from "./CountrySearch.styles";

export function CountrySearch() {
  const { isSearchDialogOpen, setIsSearchDialogOpen, currentUser } =
    useGlobalContext();
  const [searchValue, setSearchValue] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [allCountries, setAllCountries] = useState<ICountryData[]>();
  const getAllCountries = async () => {
    setIsDataLoading(true);
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data: ICountryData[] = await res.json();
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));

    setAllCountries(data);
    setIsDataLoading(false);
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
      header={
        <Paper component="form" sx={countryDialog__Paper}>
          <IconButton sx={{ p: "10px" }} aria-label="menu" disabled={true}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
            value={searchValue}
            onChange={(a) =>
              setSearchValue((a.target as HTMLInputElement).value)
            }
            autoFocus={true}
          />
        </Paper>
      }
      content={
        <CountryCard
          data={allCountries?.filter((country) => {
            return country.name.common.toLowerCase() === ""
              ? country.name.common
              : country.name.common.toLowerCase().includes(searchValue);
          })}
          isDataLoading={isDataLoading}
        />
      }
      maxWidth={"xl"}
    />
  );
}
