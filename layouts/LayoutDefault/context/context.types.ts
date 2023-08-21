import { User } from "firebase/auth";
import { Dispatch, SetStateAction } from "react";

export interface IContextProps {
  isSearchDialogOpen: boolean;
  setIsSearchDialogOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  googleSignIn: () => void;
  googleSignOut: () => void;
}
