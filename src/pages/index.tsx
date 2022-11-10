import { type NextPage } from "next";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { SystemdService } from "../lib/service";
import { SystemdTimer } from "../lib/timer";
import { RestartTypeField } from "../components/RestartTypeField";
import { FormContext } from "../lib/context";
import { TextField } from "../components/TextField";
import { CheckField } from "../components/CheckField";

const Home: NextPage = () => {
  const [domain, setDomain] = useState('systemd.h4n.io');
  const context = useContext(FormContext);
  useEffect(() => {
    setDomain(window.location.origin);
  }, [setDomain]);

  if (!context) return <h1>Text</h1>;

  const service = new SystemdService(
    context.data.name,
    context.data.description,
    context.data.service.execStart,
    context.data.timer.enabled ? "oneshot" : "simple"
  );
  service.restart = context.data.service.restartType;
  service.restartSec = context.data.service.restartTime;
  service.startLimitBurst = context.data.startLimitBurst;
  service.startLimitInterval = context.data.startLimitInterval;

  const timer = new SystemdTimer(
    context.data.name,
    context.data.description,
    `${context.data.name}.service`,
    context.data.timer.calendar
  );

  if (context.data.timer.enabled) {
    service.wants = `${context.data.name}.timer`;
  }

  return (
    <>
      <Head>
        <title>Systemd unit generator</title>
      </Head>

      <main className="container mx-auto bg-gray-50">
        <h1 className="py-6 text-center text-3xl font-bold">
          Simple Service Generator
        </h1>
        <div className="grid grid-cols-2">
          <div className="flex w-full flex-col gap-6 p-6">
            <div className="flex w-full flex-col gap-6">
              <TextField
                name="name"
                label="Name"
                onChange={(ev) => {
                  context.update({ name: ev.target.value });
                }}
                value={context.data.name}
              />

              <TextField
                name="description"
                label="Description"
                onChange={(ev) => {
                  context.update({ description: ev.target.value });
                }}
                value={context.data.description}
              />
            </div>

            <hr />

            <div className="flex w-full flex-col gap-6">
              <div className="text-lg font-bold">Service</div>

              <TextField
                name="program"
                label="Program"
                onChange={(ev) => {
                  context.update({
                    service: {
                      ...context.data.service,
                      execStart: ev.target.value,
                    },
                  });
                }}
                value={context.data.service.execStart}
              />

              <div className="grid grid-cols-2 gap-3">
                <RestartTypeField />

                <TextField
                  number
                  name="restartTime"
                  label="Restart delay (in seconds)"
                  onChange={(ev) => {
                    context.update({
                      service: {
                        ...context.data.service,
                        restartTime: parseInt(ev.target.value),
                      },
                    });
                  }}
                  value={context.data.service.restartTime?.toString()}
                />

                <TextField
                  number
                  name="startLimitBurst"
                  label="Number of startup retries before fail"
                  onChange={(ev) => {
                    context.update({ startLimitBurst: parseInt(ev.target.value) });
                  }}
                  value={context.data.startLimitBurst?.toString()}
                />

                <TextField
                  number
                  name="startLimitInterval"
                  label="Startup timeout before fail"
                  onChange={(ev) => {
                    context.update({ startLimitInterval: parseInt(ev.target.value) });
                  }}
                  value={context.data.startLimitInterval?.toString()}
                />
              </div>
            </div>

            <hr />

            <div className="flex w-full flex-col gap-6">
              <div className="text-lg font-bold">Timer</div>

              <CheckField
                name="isTimer"
                label="Enable"
                onChange={(ev) => {
                  context.update({
                    timer: {
                      ...context.data.timer,
                      enabled: ev.target.checked,
                    },
                  });
                }}
                value={context.data.timer.enabled}
              />

              <TextField
                name="calendar"
                label="Schedule"
                onChange={(ev) => {
                  context.update({
                    timer: {
                      ...context.data.timer,
                      calendar: ev.target.value,
                    },
                  });
                }}
                value={context.data.timer.calendar}
                helper={
                  <>
                    See{" "}
                    <a
                      className="font-bold text-blue-500 underline"
                      href="https://www.freedesktop.org/software/systemd/man/systemd.time.html#Calendar%20Events"
                    >
                      systemd.time(7)
                    </a>{" "}
                    for syntax help.
                  </>
                }
              />
            </div>
          </div>

          <div className="flex max-w-full flex-col gap-6 p-6">
            <p>
              Place these files on the system at the paths above them, and run{" "}
              <span className="rounded bg-gray-200 p-1 font-mono">
                systemctl daemon-reload
              </span>{" "}
              to make sure they are loaded by systemd.
            </p>
            <div>
              <div className="flex h-10 items-center bg-gray-300 px-4">
                /etc/systemd/system/{context.data.name}.service
              </div>
              <pre className="flex w-full flex-col gap-1 bg-gray-100 p-4 text-sm">
                {service
                  .toString()
                  .split("\n")
                  .map((v, i) => (
                    <p key={i} className="h-5">
                      {v}
                    </p>
                  ))}
              </pre>
            </div>
            {context.data.timer.enabled ? (
              <div>
                <div className="flex h-10 items-center bg-gray-300 px-4">
                  /etc/systemd/system/{context.data.name}.timer
                </div>
                <pre className="flex w-full flex-col gap-1 bg-gray-100 p-4 text-sm">
                  {timer
                    .toString()
                    .split("\n")
                    .map((v, i) => (
                      <p key={i} className="h-5">
                        {v}
                      </p>
                    ))}
                </pre>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <p className="container mx-auto text-center">
        Made by Hayden Young on{" "}
        <a
          className="font-bold text-blue-500 underline"
          href="https://github.com/hbjydev/systemd-generator"
        >
          GitHub
        </a>
      </p>
    </>
  );
};

export default Home;
