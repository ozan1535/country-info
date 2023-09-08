import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import { ICountryData } from "../../layouts/LayoutDefault/LayoutDefault.types";
import { countryCardValues } from "./helper";
import styles from "./CountryCard.module.css";

export function CountryCard({
  data,
  isDataLoading,
}: {
  data: ICountryData[];
  isDataLoading: boolean;
}) {
  if (isDataLoading) {
    return (
      <div className={styles["countryCard__Container"]}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Grid
      container
      justifyContent={"center"}
      columns={20}
      wrap={"wrap"}
      margin={0}
      width={"100%"}
    >
      {data.map((singleData) => (
        <Grid
          item
          xs={19}
          sm={8}
          md={5.5}
          lg={6}
          xl={3.5}
          columnGap={20}
          key={singleData.cca3}
          justifyContent={"center"}
          margin={"1rem"}
          maxWidth={"100%"}
        >
          <CardActionArea
            sx={{
              margin: "auto",
            }}
          >
            <Link href={`/${singleData.cca3}`}>
              <Card sx={{ border: "1px solid #dcdcdc" }}>
                <CardHeader
                  title={singleData.name.common}
                  subheader={`(${singleData.name.official})`}
                  sx={{ backgroundColor: "#f5f5f5" }}
                />
                <CardContent style={{ overflow: "auto" }}>
                  <Table>
                    <TableBody>
                      {countryCardValues.map((countryCardValue, i) => (
                        <TableRow key={i}>
                          <TableCell component="th" scope="row" align="left">
                            <span style={{ fontWeight: "bold" }}>
                              {countryCardValue.name}
                            </span>
                          </TableCell>
                          <TableCell align="right">
                            {singleData[
                              countryCardValue.property as keyof ICountryData
                            ]
                              ? countryCardValue.isObject
                                ? Object.keys(
                                    singleData[
                                      countryCardValue.property as keyof ICountryData
                                    ]
                                  ).map((language, i) => (
                                    <span key={i}>
                                      {i > 0 && ","} {language}
                                    </span>
                                  ))
                                : countryCardValue.isToLocaleString
                                ? singleData[
                                    countryCardValue.property as keyof ICountryData
                                  ].toLocaleString("en-US")
                                : singleData[
                                    countryCardValue.property as keyof ICountryData
                                  ]
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Link>
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
