import { Injectable } from '@angular/core';
import { LocalStorageService, IFormulaStorage } from './local-storage.service';
import { IFormula } from 'src/app/models/database.model';
import { AppDatabaseInitService } from './app-database-init.service';

@Injectable({
  providedIn: 'root'
})
export class AppDatabaseService {
  constructor(
    private lsService: LocalStorageService,
    private database: AppDatabaseInitService
  ) {
    // TODO: if it's specialty formula, add it to favSpec
  }

  addToFavorite(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name
    };
    const _userSpecialty = this.lsService.getUserSpecialty();
    this.lsService.addFavorite(_formulaStorage);
    // check and add to favorite specialty
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
}
