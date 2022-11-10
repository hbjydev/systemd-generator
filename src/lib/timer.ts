import { SystemdUnit } from "./unit"

export class SystemdTimer extends SystemdUnit {
    constructor(
        name: string,
        description: string,
        public unit: string,
        public onCalendar: string,
    ) {
        super(
            name,
            description,
        );
        this.wantedBy = 'timers.target';
    }

    protected get content(): string {
        return `[Timer]
Unit=${this.unit}
OnCalendar=${this.onCalendar}`
    }
}
