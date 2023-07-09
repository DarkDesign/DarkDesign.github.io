export class Project {
    public constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly url: string | null,
    ) {}
}
