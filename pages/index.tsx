import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import { CountryCard } from "../components/CountryCard/CountryCard";
import { CountryPagination } from "../components/CountryPagination/CountryPagination";
import { PageHead } from "../components/PageHead/PageHead";
import { getLayoutDefault } from "../layouts/LayoutDefault/LayoutDefault";
import { ICountryData } from "../layouts/LayoutDefault/LayoutDefault.types";

const Home = ({ data }: { data: ICountryData[] }): JSX.Element => {
  const [newData, setNewData] = useState<ICountryData[]>();
  const [isDataLoading, setIsDataLoading] = useState(false);

  return (
    <div>
      <PageHead title={`Country Insight`} content={"Home page"} />
      <h3 style={{ textAlign: "center", color: "#556cd6" }}>
        Explore countries and share your experience
      </h3>
      <CountryCard data={newData || data} isDataLoading={isDataLoading} />
      <CountryPagination
        setNewData={setNewData}
        setIsDataLoading={setIsDataLoading}
      />
    </div>
  );
};

export default Home;

Home.getLayout = getLayoutDefault;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,cca3,capital,languages,population,region,flag"
  );
  const data: ICountryData[] = await res.json();
  data.sort((a, b) => a.name.common.localeCompare(b.name.common));

  const sliceBegin = context.query.page
    ? 25 * (Number(context.query.page) - 1)
    : 0;
  const sliceEnd = context.query.page ? 25 * Number(context.query.page) : 25;

  const slicedData = data.slice(sliceBegin, sliceEnd);

  return { props: { data: slicedData } };
};
