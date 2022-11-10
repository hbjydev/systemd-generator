import { SystemdUnit } from "./unit"

export type SystemdServiceRestartType =
    'no' |
    'on-success' |
    'on-failure' |
    'on-abnormal' |
    'on-watchdog' |
    'on-abort' |
    'always';

export class SystemdService extends SystemdUnit {
    public restart?: SystemdServiceRestartType;
    public restartSec?: number;

    constructor(
        name: string,
        description: string,
        public execStart: string,
        public type: 'oneshot' | 'simple',
    ) {
        super(name, description)
    }

    protected get content(): string {
        let base = `[Service]
Type=${this.type}
ExecStart=${this.execStart}`;

        if (this.restart) {
            base = `${base}\nRestart=${this.restart}`;
        }

        if (this.restartSec) {
            base = `${base}\nRestartSec=${this.restartSec}`;
        }

        return base;
    }
}