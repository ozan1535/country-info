import { ICountryData } from "../layouts/LayoutDefault/LayoutDefault.types";

export const getCountryInfo = (data: ICountryData) => {
  const nativeNames =
    data.name.nativeName && Object.values(data.name.nativeName);
  const demonyms = Object.fromEntries(
    Object.entries(data.demonyms).filter(([key]) => key.includes("eng"))
  );

  const currency =
    data.currencies &&
    Object.entries(data.currencies).map((a) => ({
      title: a[0],
      name: a[1].name,
    }));

  const names = [
    { title: "Common", name: data.name.common },
    { title: "Official", name: data.name.official },
    {
      title: "Common (Native)",
      name: data.name.nativeName && nativeNames.map((a) => a.common).join(", "),
    },
    {
      title: "Official (Native)",
      name:
        data.name.nativeName && nativeNames.map((a) => a.official).join(", "),
    },
    {
      title: "Alternative spellings",
      name: data.altSpellings,
    },
  ];

  const languages =
    data.languages &&
    Object.entries(data.languages).map((a) => ({
      title: a[0],
      name: a[1],
    }));

  const codes = [
    { title: "ISO 3166-1 alpha-2", name: data.cca2 },
    { title: "ISO 3166-1 alpha-3", name: data.cca3 },
    { title: "ISO 3166-1 numeric", name: data.ccn3 },
    { title: "Top level domains", name: data.tld },
  ];

  const geography = [
    { title: "Region", name: data.region },
    { title: "Sub-region", name: data.subregion },
    { title: "Capital", name: data.capital },
    {
      title: "Demonym",
      name: `f: ${demonyms.eng.f}, m: ${demonyms.eng.m}`,
    },
    { title: "Lat/Lng", name: data.latlng.map((item) => item.toFixed(2)) },
    { title: "Area/Lng", name: data.area },
    { title: "Land borders", name: data.borders },
    {
      title: "Population",
      name: data.population.toLocaleString("en-US") || "-",
    },
  ];

  return {
    names,
    languages,
    codes,
    geography,
    currency,
  };
};
