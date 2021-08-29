import React from "react";
import { Helmet as Head } from "react-helmet";

const Meta = ({ title, description = "COVID-19 Dashboard" }) => {
  return (
    <Head
      title={title}
      titleTemplate="%s | COVID-19 Dashboard"
      defaultTitle="COVID-19 Dashboard"
    >
      <meta name="description" content={description} />
    </Head>
  );
};

export default Meta;
