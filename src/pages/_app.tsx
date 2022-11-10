import { type AppType } from "next/dist/shared/lib/utils";
import { useState } from "react";
import type { FormContextStructure, FormData } from "../lib/context";
import { FormContext } from "../lib/context";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [data, setData] = useState<FormData>({
    name: "grafana-agent",
    description: "Run Grafana Agent",
    service: {
      execStart: "/usr/bin/grafana-agent",
      restartType: "no",
    },
    timer: {
      enabled: false,
      calendar: "*-*-* *:*:0",
    },
  });

  const contextData: FormContextStructure = {
    data,
    update(newData) {
      setData({ ...data, ...newData } as FormData);
    },
  };

  return (
    <FormContext.Provider value={contextData}>
      <Component {...pageProps} />
    </FormContext.Provider>
  );
};

export default MyApp;
