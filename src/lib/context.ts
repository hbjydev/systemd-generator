import React from "react";
import type { SystemdServiceRestartType } from "./service";

export type FormData = {
  name: string;
  description: string;

  startLimitInterval?: number;
  startLimitBurst?: number;

  service: {
    execStart: string;
    restartType?: SystemdServiceRestartType;
    restartTime?: number;
  };

  timer: {
    enabled: boolean;
    calendar: string;
  };
};

export type FormContextStructure = {
  data: FormData;
  update: (data: Partial<FormData>) => void;
};

export const FormContext =
  React.createContext<FormContextStructure | undefined>(undefined);
