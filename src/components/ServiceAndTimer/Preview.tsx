import { useContext } from "react";
import { ServiceTimerContext } from "../../lib/context";
import { SystemdService } from "../../lib/service";
import { SystemdTimer } from "../../lib/timer";

export const Preview = () => {
  const context = useContext(ServiceTimerContext);
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
  );
};
