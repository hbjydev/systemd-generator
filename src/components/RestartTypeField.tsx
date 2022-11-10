import type { ChangeEvent } from "react";
import React, { useContext } from "react";
import { FormContext } from "../lib/context";
import type { SystemdServiceRestartType } from "../lib/service";

export const RestartTypeField: React.FC = () => {
  const formData = useContext(FormContext);

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    formData?.update({
      service: {
        execStart: formData.data.service.execStart,
        restartType: ev.target.value as SystemdServiceRestartType,
      },
    });
  };

  return (
    <fieldset className="flex flex-col gap-3">
      <label htmlFor="restart">Restart</label>
      <select
        id="restart"
        className="border bg-white px-2 h-9 flex items-center focus:border-blue-500 focus:outline-none"
        onChange={onChange}
      >
        <option
          value="no"
          selected={formData?.data.service.restartType == "no"}
        >
          No
        </option>
        <option
          value="on-success"
          selected={formData?.data.service.restartType == "on-success"}
        >
          On Success
        </option>
        <option
          value="on-failure"
          selected={formData?.data.service.restartType == "on-failure"}
        >
          On Failure
        </option>
        <option
          value="on-abnormal"
          selected={formData?.data.service.restartType == "on-abnormal"}
        >
          On Abnormal
        </option>
        <option
          value="on-watchdog"
          selected={formData?.data.service.restartType == "on-watchdog"}
        >
          On Watchdog
        </option>
        <option
          value="on-abort"
          selected={formData?.data.service.restartType == "on-abort"}
        >
          On Abort
        </option>
        <option
          value="always"
          selected={formData?.data.service.restartType == "always"}
        >
          Always
        </option>
      </select>
    </fieldset>
  );
};
