import Head from "next/head";
import { IPageHead } from "./PageHead.types";

export const PageHead = ({ title, content }: IPageHead) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={content} />
      <meta name="keywords" content={title} />
      <link rel="icon" href="/world.png" />
    </Head>
  );
};
