import { Injectable } from '@angular/core';
import { ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { FormulaService } from './formula.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(
    private database: DatabaseService,
    private formulaService: FormulaService
  ) {}
  getUserSpecialty(): ISpecialty {
    return JSON.parse(localStorage.getItem('user-specialty'));
  }
  getAll(): Promise<ISpecialty[]> {
    return this.database.specialties.toArray();
  }
  saveUserSpecialty(specialty: ISpecialty) {
    localStorage.setItem('user-specialty', JSON.stringify(specialty));
    this.formulaService.updateSpecialtiesSummary();
  }
}
