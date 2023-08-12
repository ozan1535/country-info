import React from "react";
import { Header } from "./../../components/Header/Header";
import { GlobalContextProvider } from "./context";
import { ILayoutDefaultProp } from "./LayoutDefault.types";

export function LayoutDefault(layoutProps: ILayoutDefaultProp): JSX.Element {
  const { children } = layoutProps;

  return (
    <GlobalContextProvider>
      <div>
        <Header />
        {children}
      </div>
    </GlobalContextProvider>
  );
}
export const getLayoutDefault = (
  page: JSX.Element,
  layoutProps: ILayoutDefaultProp
): JSX.Element => <LayoutDefault {...layoutProps}>{page}</LayoutDefault>;
