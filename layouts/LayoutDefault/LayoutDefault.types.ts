import { ReactElement } from "react";

export interface IName {
  common: string;
  official: string;
  nativeName: Record<string, any>;
}

export interface ICurrency {
  name: string;
  symbol: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface ICapitalInfo {
  latlng: number[];
}

export interface IFlagUrls {
  png: string;
  svg: string;
  alt: string;
}

export interface ICoatOfArmsUrls {
  png: string;
  svg: string;
}

export interface IPostalCode {
  format: string;
  regex: string;
}

export interface ICountryData {
  name: IName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Record<string, any>;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Record<string, string>;
  // Strange behaviour. When I set this to its normal type, I get TS error on CountryCard.tsx
  translations: any;
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Record<string, { f: string; m: string }>;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  fifa: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: IFlagUrls;
  coatOfArms: ICoatOfArmsUrls;
  startOfWeek: string;
  capitalInfo: ICapitalInfo;
  postalCode: IPostalCode;
}

export interface ILayoutDefaultProp {
  children: ReactElement;
  data: ICountryData[];
}
