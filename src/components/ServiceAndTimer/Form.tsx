import { useContext } from "react";
import { ServiceTimerContext } from "../../lib/context";
import { A } from "../A";
import { CheckField } from "../CheckField";
import { RestartTypeField } from "../RestartTypeField";
import { TextField } from "../TextField";

export const Form = () => {
  const context = useContext(ServiceTimerContext);
  if (!context) return <h1>Text</h1>;

  return (
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
              <A href="https://www.freedesktop.org/software/systemd/man/systemd.time.html">
                systemd.time(7)
              </A>{" "}
              for syntax help.
            </>
          }
        />
      </div>
    </div>
  );
};
