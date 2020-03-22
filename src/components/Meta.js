import React from "react";
import { Helmet as Head } from "react-helmet";

const Meta = ({ title, description = "COVID-19 Status" }) => {
  return (
    <Head
      title={title}
      titleTemplate="%s | COVID-19 Status"
      defaultTitle="COVID-19 Status"
    >
      <meta name="description" content={description} />
    </Head>
  );
};

export { Meta };
