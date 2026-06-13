import { IRegionRepository } from "../../domain/repositories/IRegionRepository";
import { Region } from "../../domain/entities/Region";

export class InMemoryRegionRepository implements IRegionRepository {
  private regions: Region[] = [
    new Region("1", "São Paulo", "SP", "Brasil"),
    new Region("2", "Rio de Janeiro", "RJ", "Brasil"),
    new Region("3", "Salvador", "BA", "Brasil"),
  ];

  async findAll(): Promise<Region[]> {
    return this.regions;
  }

  async findById(id: string): Promise<Region | null> {
    return this.regions.find((r) => r.id === id) || null;
  }
}
