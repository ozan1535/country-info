import { Dispatch, SetStateAction } from "react";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";

export interface ICountryPagination {
  setNewData: Dispatch<SetStateAction<ICountryData[] | undefined>>;
  setIsDataLoading: Dispatch<SetStateAction<boolean>>;
}
