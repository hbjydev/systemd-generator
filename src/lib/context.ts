import React from "react";
import type { SystemdServiceRestartType } from "./service";

export type BaseUnitData = {
  name: string;
  description: string;
  startLimitInterval?: number;
  startLimitBurst?: number;
}

export type ContextSkeleton<T> = {
  data: T & BaseUnitData;
  update: (newData: Partial<T & BaseUnitData>) => void;
}

export type ServiceTimerFormData = {
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

export type VolumeMountFormData = {
  what: string;
  where: string;
  type: string;
  options: string;
};

export const ServiceTimerContext =
  React.createContext<ContextSkeleton<ServiceTimerFormData> | undefined>(undefined);


export const VolumeMountContext =
  React.createContext<ContextSkeleton<VolumeMountFormData> | undefined>(undefined);
