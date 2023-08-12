import { Grid, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { CountryImage } from "../components/CountryImage/CountryImage";
import CountryMoreInfo from "../components/CountryMoreInfo/CountryMoreInfo";
import { CountryTable } from "../components/CountryTable/CountryTable";
import { getCountryInfo } from "../helpers";
import { getLayoutDefault } from "../layouts/LayoutDefault/LayoutDefault";
import { ICountryData } from "../layouts/LayoutDefault/LayoutDefault.types";

export default function CountryInformation({ data }: { data: ICountryData }) {
  const countryInfo = getCountryInfo(data);

  return (
    <div>
      <Typography
        variant="h2"
        align="center"
        marginBottom={5}
        sx={{ fontWeight: "bold" }}
      >
        {countryInfo.names[0].name} {data.flag}
      </Typography>
      <CountryImage countryName={countryInfo.names[0].name as string} />

      <Grid
        container
        justifyContent={"center"}
        columns={20}
        gap={2}
        wrap={"wrap"}
        width={"100%"}
      >
        <CountryTable name="Name" data={countryInfo.names} />
        <CountryTable
          name="Geography"
          data={countryInfo.geography}
          countryName={countryInfo.names[0].name as string}
        />
        <Grid item direction={"column"} xs={18} sm={9} md={6} lg={5} xl={5}>
          <CountryTable name="Languages" data={countryInfo.languages} />
          <CountryTable name="Currency" data={countryInfo.currency} />
        </Grid>
        <CountryTable name="Codes" data={countryInfo.codes} />
      </Grid>

      <CountryMoreInfo countryName={countryInfo.names[0].name as string} />
    </div>
  );
}

CountryInformation.getLayout = getLayoutDefault;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha/${context.query.id}`
  );
  const data = await res.json();

  return { props: { data: data[0] } };
};
