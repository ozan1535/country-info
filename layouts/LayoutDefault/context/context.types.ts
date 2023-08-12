import { Dispatch, SetStateAction } from "react";

export interface IContextProps {
  isSearchDialogOpen: boolean;
  setIsSearchDialogOpen: Dispatch<SetStateAction<boolean>>;
}
