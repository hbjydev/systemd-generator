import { SystemdUnit } from "./unit"

export class SystemdService extends SystemdUnit {
    constructor(
        name: string,
        description: string,
        public execStart: string,
        public type: 'oneshot' | 'simple',
    ) {
        super(name, description)
    }

    protected get content(): string {
        return `[Service]
Type=${this.type}
ExecStart=${this.execStart}`
    }
}