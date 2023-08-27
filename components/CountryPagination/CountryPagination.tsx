import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { ICountryPagination } from "./CountryPagination.types";
import styles from "./countryPagination.module.css";
import { handlePaginationChange } from "./CountryPagination.helpers";

export function CountryPagination({
  setNewData,
  setIsDataLoading,
}: ICountryPagination) {
  const router = useRouter();
  const [isPaginationClicked, setIsPaginationClicked] = useState(false);

  useEffect(() => {
    if (!router.query.page && isPaginationClicked) {
      handlePaginationChange(1, router, setIsDataLoading, setNewData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.page]);

  return (
    <Pagination
      count={10}
      defaultPage={Number(router.query.page) || 1}
      page={Number(router.query.page) || 1}
      siblingCount={1}
      color="primary"
      className={styles["countryPagination__container"]}
      onChange={(e, page) => {
        handlePaginationChange(page, router, setIsDataLoading, setNewData);
        setIsPaginationClicked(true);
      }}
    />
  );
}
