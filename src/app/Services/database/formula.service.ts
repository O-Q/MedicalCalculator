import { Injectable } from '@angular/core';
import { IFormula, ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  recentLimit = 10;
  constructor(private database: DatabaseService) {}

  getAll(): Promise<IFormula[]> {
    return this.database.formulas.toArray();
  }

  get(formulaId: number): Promise<IFormula> {
    return this.database.formulas.get(formulaId);
  }

  updateSpecialtiesSummary(specialty: ISpecialty) {
    this._getBySpecialty(specialty).then(formulas => {
      const _formulasStorage: IFormulaStorage[] = formulas.map(formula => {
        return { id: formula.id, name: formula.name, desc: formula.desc };
      });
      localStorage.setItem(
        'specialty-formulas',
        JSON.stringify(_formulasStorage)
      );
    });
  }

  // getFavorites(): Promise<IFormula[]> {
  //   const _favorites = this.getFavoritesSummary().map(favorite => favorite.id);
  //   return this.database.formulas
  //     .where('id')
  //     .anyOf(_favorites)
  //     .toArray();
  // }
  // getRecents(): Promise<IFormula[]> {
  //   const _recents = this.getRecentsSummary().map(recent => recent.id);
  //   return this.database.formulas
  //     .where('id')
  //     .anyOf(_recents)
  //     .toArray();
  // }
  addRecent(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name,
      desc: formula.desc
    };
    const _recents = this.getRecentsSummary();
    while (_recents.length >= this.recentLimit) {
      _recents.shift();
    }
    _recents.push(_formulaStorage);
    localStorage.setItem('recent-formulas', JSON.stringify(_recents));
  }

  addFavorite(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name,
      desc: formula.desc
    };
    const _favorites = this.getFavoritesSummary();
    _favorites.push(_formulaStorage);
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
  }

  removeFavorite(formula: IFormula) {
    const _favorites = this.getFavoritesSummary().filter(
      favorite => favorite.id !== formula.id
    );
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
  }

  getRecentsSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('recent-formulas'));
  }

  getFavoritesSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('favorite-formulas'));
  }
  getSpecialtiesSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('specialty-formulas'));
  }

  /**
   * Return all formulas with detail in specific specialty
   * @param specialty default value is specialty of user stored in localStorage
   */
  private _getBySpecialty(specialty: ISpecialty): Promise<IFormula[]> {
    return this.database.formulas
      .where('specialtyIds')
      .equals(specialty.id)
      .toArray();
  }
}

export interface IFormulaStorage {
  id: number;
  name: string;
  desc: string;
}
