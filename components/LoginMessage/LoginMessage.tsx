import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { useGlobalContext } from "../../layouts/LayoutDefault/context";

export const LoginMessage = ({
  setOpenDialog,
}: {
  setOpenDialog: Dispatch<SetStateAction<boolean>>;
}) => {
  const { googleSignIn } = useGlobalContext();

  return (
    <div>
      Please log in to your account. Logging in allows you to engage with our
      community and enjoy a personalized experience.
      <br />
      <Button
        sx={{ my: 1, float: "right" }}
        variant="contained"
        onClick={() => {
          googleSignIn();
          setOpenDialog(false);
        }}
      >
        LOGIN
      </Button>
    </div>
  );
};
