export interface ICountryTableData {
  title: string;
  name: any;
}

export interface ICountryTable {
  name: string;
  data: ICountryTableData[];
  countryName?: string;
}
