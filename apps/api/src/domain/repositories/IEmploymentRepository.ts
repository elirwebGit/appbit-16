import { Employment } from "../entities/Employment";

export interface IEmploymentRepository {
  findAll(): Promise<Employment[]>;
  findByRegion(regionId: string): Promise<Employment[]>;
}
