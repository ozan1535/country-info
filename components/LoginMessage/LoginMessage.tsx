import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export const LoginMessage = ({
  setOpenDialog,
}: {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div>
      Please log in to your account. Logging in allows you to engage with our
      community and enjoy a personalized experience.
      <br />
      <Button
        sx={{ my: 1, float: "right" }}
        variant="contained"
        onClick={() => {
          window.location.replace("/login");
          setOpenDialog(false);
        }}
      >
        LOGIN
      </Button>
    </div>
  );
};
