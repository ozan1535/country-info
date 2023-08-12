import { ICountryCardValues } from "./CountryCard.types";

export const countryCardValues: ICountryCardValues[] = [
  {
    name: "Capital",
    property: "capital",
  },
  {
    name: "Language",
    property: "languages",
    isObject: true,
  },
  {
    name: "Population",
    property: "population",
    isToLocaleString: true,
  },
  {
    name: "Region",
    property: "region",
  },
];
