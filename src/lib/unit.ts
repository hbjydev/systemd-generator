export class SystemdUnit {
    constructor(
        public name: string,
        public description: string,
        public wants?: string,
        public wantedBy?: string,
    ) {}

    protected get content(): string {
        return ""
    }

    public toString(): string {
        let base = `[Unit]\nDescription=${this.description}`;
        if (this.wants) {
            base = `${base}\nWants=${this.wants}`;
        }

        const inner = this.content;
        if (inner.length > 0) {
            base = `${base}\n\n${inner}`;
        }

        base = `${base}\n\n[Install]\nWantedBy=${this.wantedBy}`

        return base;
    }
}
