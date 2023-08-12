import { ICountryTableData } from "./CountryTable.types";

export const getIsDataNumberStringOrUndefined = (
  singleData: ICountryTableData
) => {
  return (
    typeof singleData.name === "string" ||
    typeof singleData.name === "number" ||
    singleData.name === undefined
  );
};
export const getIsTitleLandBorders = (singleData: ICountryTableData) => {
  return singleData.title === "Land borders";
};
export const getIsTitleLatLng = (singleData: ICountryTableData) => {
  return singleData.title === "Lat/Lng";
};
