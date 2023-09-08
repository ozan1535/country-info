import { DialogContent, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { ICountryDialog } from "./CountryDialog.types";
import { CountryDialogHeader } from "./CountryDialogHeader";

export function CountryDialog({
  open,
  handleClose,
  header,
  content,
  maxWidth,
}: ICountryDialog) {
  if (!content) {
    return null;
  }

  return (
    <Dialog
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={true}
      aria-labelledby="customized-dialog-title"
      open={open}
      PaperProps={{
        sx: {
          minHeight: 200,
        },
      }}
    >
      {header && (
        <CountryDialogHeader id="customized-dialog-title" onClose={handleClose}>
          {header}
        </CountryDialogHeader>
      )}
      <DialogContent dividers>{content}</DialogContent>
    </Dialog>
  );
}
