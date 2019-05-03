import { Injectable } from '@angular/core';
import { LocalStorageService, IFormulaStorage } from './local-storage.service';
import { IFormula, ICreator } from 'src/app/models/database.model';
import { AppDatabaseInitService } from './app-database-init.service';

@Injectable({
  providedIn: 'root'
})
export class AppDatabaseService {
  constructor(
    private lsService: LocalStorageService,
    private database: AppDatabaseInitService
  ) {}

  addToFavorite(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name
    };
    const _userSpecialty = this.lsService.getUserSpecialty();
    this.lsService.addFavorite(_formulaStorage);
    // check and add to specialty favorites
    this.database.formulaSpecialty
      .where('formulaId')
      .equals(formula.id)
      .first(result => result.specialtyId === _userSpecialty.id)
      .then(isSome => {
        if (isSome) {
          this.lsService.addSpecialtyFavorite(_formulaStorage);
        }
      });
  }

  getFormula(formulaId: number): Promise<IFormula> {
    return this.database.formulas.get(formulaId);
  }

  getCreator(creatorId: number): Promise<ICreator> {
    return this.database.creators.get(creatorId);
  }
}
