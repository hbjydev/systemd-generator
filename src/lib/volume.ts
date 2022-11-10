import { SystemdUnit } from "./unit"

export class SystemdMount extends SystemdUnit {
    constructor(
        name: string,
        description: string,

        public what: string,
        public where: string,
        public type: string,
        public options: string = "defaults",
    ) {
        super(name, description)
    }

    protected get content(): string {
        const base = `[Mount]
What=${this.what}
Where=${this.where}
Type=${this.type}
Options=${this.options}`;

        return base;
    }
}