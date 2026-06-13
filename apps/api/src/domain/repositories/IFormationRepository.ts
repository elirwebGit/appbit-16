import { Formation } from "../entities/Formation";

export interface IFormationRepository {
  findAll(): Promise<Formation[]>;
  findByRegion(regionId: string): Promise<Formation[]>;
  findById(id: string): Promise<Formation | null>;
}
