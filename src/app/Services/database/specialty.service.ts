import { Injectable } from '@angular/core';
import { ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { FormulaService } from './formula.service';
import { ToastService, ToastType } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  constructor(
    private database: DatabaseService,
    private formulaService: FormulaService,
    private toast: ToastService
  ) {}
  getUserSpecialty(): ISpecialty {
    return JSON.parse(localStorage.getItem('user-specialty'));
  }
  getAll(): Promise<ISpecialty[]> {
    return this.database.specialties.toArray();
  }
  saveUserSpecialty(specialtyId: number) {
    this.database.specialties.get(specialtyId).then(specialty => {
      localStorage.setItem('user-specialty', JSON.stringify(specialty));
      this.formulaService.updateSpecialtiesSummary();
      this.toast.show(`تخصص، ${specialty.name} شد.`, '', ToastType.SUCCESS);
    });
  }
}
