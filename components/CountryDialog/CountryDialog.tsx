import { DialogContent, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { ICountryDialog } from "./CountryDialog.types";
import { CountryDialogHeader } from "./CountryDialogHeader";

export function CountryDialog({
  open,
  handleClose,
  header,
  content,
}: ICountryDialog) {
  if (!header || !content) {
    return null;
  }

  return (
    <Dialog
      onClose={handleClose}
      maxWidth={"xl"}
      fullWidth={true}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <CountryDialogHeader id="customized-dialog-title" onClose={handleClose}>
        {header}
      </CountryDialogHeader>
      <DialogContent dividers>{content}</DialogContent>
    </Dialog>
  );
}
