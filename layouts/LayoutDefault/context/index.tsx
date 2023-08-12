import { createContext, ReactElement, useContext, useState } from "react";
import { IContextProps } from "./context.types";

const initialState = {
  isSearchDialogOpen: false,
  setIsSearchDialogOpen: () => false,
};

const GlobalContext = createContext<IContextProps>(initialState);

export function GlobalContextProvider(props: { children: ReactElement }) {
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  const context = {
    isSearchDialogOpen,
    setIsSearchDialogOpen,
  };

  return (
    <GlobalContext.Provider value={context}>
      {props.children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
