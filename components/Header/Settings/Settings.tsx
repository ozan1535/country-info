import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import Login from "@mui/icons-material/Login";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Person from "@mui/icons-material/Person";
import { useGlobalContext } from "../../../layouts/LayoutDefault/context";
import { SettingsBox, SettingsMenuPaperProps } from "./Settings.helper";

export function Settings() {
  const { googleSignIn, googleSignOut, currentUser } = useGlobalContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (type: string | null = null) => {
    setAnchorEl(null);
    if (type) {
      if (type === "login") {
        googleSignIn();
      } else if (type === "logout") {
        googleSignOut();
      }
    }
  };

  return (
    <div>
      <Box sx={SettingsBox}>
        <Tooltip title="Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {currentUser?.photoURL ? (
              <Avatar
                src={currentUser.photoURL}
                sx={{ border: "2px solid #dcdcdc" }}
              />
            ) : (
              <Avatar
                sx={{ backgroundColor: "#566CD6", border: "2px solid #dcdcdc" }}
              >
                <AccountCircle fontSize="large" />
              </Avatar>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => handleClose()}
        onClick={() => handleClose()}
        PaperProps={SettingsMenuPaperProps}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {currentUser && (
          <MenuItem onClick={() => handleClose()}>
            <ListItemIcon>
              <Person fontSize="medium" />
            </ListItemIcon>
            My account
          </MenuItem>
        )}
        {currentUser && <Divider />}

        <MenuItem onClick={() => handleClose(currentUser ? "logout" : "login")}>
          <ListItemIcon>
            {currentUser ? (
              <Logout fontSize="medium" />
            ) : (
              <Login fontSize="medium" />
            )}
          </ListItemIcon>
          {currentUser ? "Logout" : "Login"}
        </MenuItem>
      </Menu>
    </div>
  );
}
