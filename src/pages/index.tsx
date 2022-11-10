import { type NextPage } from "next";
import Head from "next/head";
import { Shell } from "../components/Shell";
import { Form } from "../components/ServiceAndTimer/Form";
import { Preview } from "../components/ServiceAndTimer/Preview";
import type { ContextSkeleton, ServiceTimerFormData } from "../lib/context";
import { ServiceTimerContext } from "../lib/context";
import { useState } from "react";

type CSST = ContextSkeleton<ServiceTimerFormData>;

const Home: NextPage = () => {
  const [data, setData] = useState<CSST['data']>({
    name: "grafana-agent",
    description: "Run Grafana Agent",
    startLimitBurst: undefined,
    startLimitInterval: undefined,
    service: {
      execStart: "/usr/bin/grafana-agent",
      restartType: "no",
      restartTime: 0,
    },
    timer: {
      enabled: false,
      calendar: "*-*-* *:*:0",
    },
  });

  const contextData: CSST = {
    data,
    update(newData) {
      setData({ ...data, ...newData } as CSST['data']);
    },
  };

  return (
    <>
      <Head>
        <title>systemd unit generator</title>
      </Head>

      <Shell>
        <ServiceTimerContext.Provider value={contextData}>
          <div className="grid grid-cols-2">
            <Form />
            <Preview />
          </div>
        </ServiceTimerContext.Provider>
      </Shell>
    </>
  );
};

export default Home;
