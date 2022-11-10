import React from "react";
import type { SystemdServiceRestartType } from "./service";

export type FormData = {
  name: string;
  description: string;

  service: {
    execStart: string;
    restartType?: SystemdServiceRestartType;
  };

  timer: {
    enabled: boolean;
    calendar: string;
  };

  [key: string]: string | { [key: string]: (string | boolean) };
};

export type FormContextStructure = {
  data: FormData;
  update: (data: Partial<FormData>) => void;
};

export const FormContext =
  React.createContext<FormContextStructure | undefined>(undefined);
