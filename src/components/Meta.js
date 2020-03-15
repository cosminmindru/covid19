import React from "react";
import { Helmet as Head } from "react-helmet";

const Meta = ({ title, description = "COVID-19 Status Dashboard" }) => {
  return (
    <Head
      title={title}
      titleTemplate="%s | COVID-19 Status Dashboard"
      defaultTitle="COVID-19 Status Dashboard"
    >
      <meta name="description" content={description} />
    </Head>
  );
};

export default Meta;
