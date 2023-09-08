import { Breakpoint } from "@mui/material";
import { ReactNode } from "react";

export interface ICountryDialog {
  open: boolean;
  handleClose: () => void;
  header: JSX.Element | null;
  content: JSX.Element;
  maxWidth: Breakpoint;
}

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}
