import { ReactNode } from "react";

export interface ICountryDialog {
  open: boolean;
  handleClose: () => void;
  header: JSX.Element;
  content: JSX.Element;
}

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}
