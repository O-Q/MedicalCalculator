import { Injectable } from '@angular/core';
import { ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { FormulaService } from './formula.service';
import { ToastService, ToastType } from '../toast.service';
import { EventEmitter } from 'events';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {
  private userSpecialty = new BehaviorSubject(this.getUserSpecialty());
  userSpecialty$ = this.userSpecialty.asObservable();
  all$ = this.database.allSpecialty$.asObservable();
  constructor(
    private database: DatabaseService,
    private formulaService: FormulaService,
    private toast: ToastService
  ) {}
  private getUserSpecialty(): ISpecialty {
    return JSON.parse(localStorage.getItem('user-specialty'));
  }

  saveUserSpecialty(specialtyId: number) {
    this.database.specialties.get(specialtyId).then(specialty => {
      localStorage.setItem('user-specialty', JSON.stringify(specialty));
      this.formulaService.updateSpecialtiesSummary();
      this.toast.show(`تخصص، ${specialty.name} شد.`, '', ToastType.SUCCESS);
      this.userSpecialty.next(specialty);
    });
  }
  removeUserSpecialty() {
    localStorage.removeItem('user-specialty');
    this.formulaService.updateSpecialtiesSummary();
    this.userSpecialty.next(null);
  }
}
