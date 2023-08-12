export interface ICountryInfo {
  batchcomplete: string;
  query: {
    normalized: { from: string; to: string }[];
    pages: {
      [key: string]: {
        pageid: string;
        ns: number;
        title: string;
        extract: string;
      };
    };
  };
}

export interface ICountryMoreInfo {
  countryName: string;
}
