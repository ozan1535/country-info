import { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";

export const handlePaginationChange = async (
  page: number,
  router: NextRouter,
  setIsDataLoading: Dispatch<SetStateAction<boolean>>,
  setNewData: Dispatch<SetStateAction<ICountryData[] | undefined>>
) => {
  setIsDataLoading(true);
  const url = new URL(router.asPath, window.location.origin);
  url.searchParams.set("page", page.toString());

  // https://nextjs.org/docs/routing/shallow-routing
  router.push(url, undefined, { shallow: true });

  const res = await fetch("https://restcountries.com/v3.1/all");
  const data: ICountryData[] = await res.json();
  data.sort((a, b) => a.name.common.localeCompare(b.name.common));

  const slicedData = data.slice(25 * (page - 1), 25 * page);
  setNewData(slicedData);
  setIsDataLoading(false);
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};
