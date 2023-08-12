import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";
import { ICountryPagination } from "./CountryPagination.types";
import styles from "./countryPagination.module.css";

export function CountryPagination({
  setNewData,
  setIsDataLoading,
}: ICountryPagination) {
  const router = useRouter();

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    page: number
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
  };

  return (
    <Pagination
      count={10}
      defaultPage={Number(router.query.page) || 1}
      siblingCount={1}
      color="primary"
      className={styles["countryPagination__container"]}
      onChange={handleChange}
    />
  );
}
