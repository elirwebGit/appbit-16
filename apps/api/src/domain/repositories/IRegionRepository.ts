import { Region } from "../entities/Region";

export interface IRegionRepository {
  findAll(): Promise<Region[]>;
  findById(id: string): Promise<Region | null>;
}
