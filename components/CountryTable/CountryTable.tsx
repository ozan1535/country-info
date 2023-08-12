import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import {
  getIsDataNumberStringOrUndefined,
  getIsTitleLandBorders,
  getIsTitleLatLng,
} from "./CountryTable.helper";
import { ICountryTable } from "./CountryTable.types";
import { countryTable__Table } from "./CountryTable.styles";

export function CountryTable({ name, data, countryName }: ICountryTable) {
  return (
    <Grid
      item
      xs={20}
      sm={9}
      md={6}
      lg={5}
      xl={4}
      key={name}
      justifyContent={"center"}
      marginTop={"1rem"}
    >
      <Table sx={countryTable__Table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={2}>
              <p style={{ fontSize: "1rem", margin: 0 }}>
                <b>{name}</b>
              </p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((singleData, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row" align="left">
                <span style={{ fontWeight: "bold" }}>{singleData.title}</span>
              </TableCell>
              <TableCell align="right">
                {getIsDataNumberStringOrUndefined(singleData) ? (
                  singleData.name || "-"
                ) : getIsTitleLandBorders(singleData) ? (
                  singleData.name.map((a: any, i: number) => (
                    <Link key={i} href={`/${a}`} style={{ color: "blue" }}>
                      {i > 0 && ", "} {a}
                    </Link>
                  ))
                ) : getIsTitleLatLng(singleData) ? (
                  <Link
                    href={`https://www.google.com/maps/place/${countryName}`}
                    target={"_blank"}
                    style={{ color: "blue" }}
                  >
                    {singleData.name.join(", ")}
                  </Link>
                ) : (
                  singleData.name.join(", ")
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Grid>
  );
}
