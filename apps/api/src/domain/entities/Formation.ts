export class Formation {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly regionId: string,
    public readonly type: "tech" | "soft-skills" | "digital-inclusion",
    public readonly provider: string,
  ) {}
}
