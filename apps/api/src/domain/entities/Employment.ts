export class Employment {
  constructor(
    public readonly id: string,
    public readonly regionId: string,
    public readonly unemploymentRate: number,
    public readonly formalEmploymentRate: number,
    public readonly sector: string,
    public readonly demographicGroup: string,
  ) {}
}
