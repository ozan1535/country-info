import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useGlobalContext } from "../../layouts/LayoutDefault/context";
import { CountrySearch } from "../CountrySearch/CountrySearch";
import { Settings } from "./Settings/Settings";

export function Header() {
  const router = useRouter();

  const { isSearchDialogOpen, setIsSearchDialogOpen } = useGlobalContext();

  useEffect(() => {
    setIsSearchDialogOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">Country Insight</Link>
        </Typography>
        <IconButton
          size="large"
          aria-label="search"
          color="inherit"
          title="Search"
          onClick={() => setIsSearchDialogOpen(true)}
        >
          <SearchIcon />
        </IconButton>
        <Settings />
      </Toolbar>
      {isSearchDialogOpen && <CountrySearch />}
    </AppBar>
  );
}
