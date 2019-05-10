import { Injectable } from '@angular/core';
import { IFormula, ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { BehaviorSubject } from 'rxjs';
import { SpecialtyService } from './specialty.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private recnets = new BehaviorSubject(this._getRecentsSummary());
  private favorites = new BehaviorSubject(this._getFavoritesSummary());
  private specialties = new BehaviorSubject(null);
  private all = new BehaviorSubject(null);
  recents$ = this.recnets.asObservable();
  favorites$ = this.favorites.asObservable();
  specialties$ = this.specialties.asObservable();
  all$ = this.all.asObservable();
  recentLimit = 10;
  constructor(private database: DatabaseService) {
    this._updateAllSummary();
    this.updateSpecialtiesSummary();
  }

  get(formulaId: number): Promise<IFormula> {
    return this.database.formulas.get(formulaId);
  }

  addRecent(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name,
      desc: formula.desc
    };
    const _recents = this.recnets.getValue();
    while (_recents.length >= this.recentLimit) {
      _recents.shift();
    }
    _recents.push(_formulaStorage);
    this.recnets.next(_recents);
    localStorage.setItem('recent-formulas', JSON.stringify(_recents));
  }

  addFavorite(formula: IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name,
      desc: formula.desc
    };
    const _favorites = this.favorites.getValue();
    _favorites.push(_formulaStorage);
    this.favorites.next(_favorites);
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
  }

  removeFavorite(formula: IFormula) {
    const _favorites = this.favorites.value.filter(
      favorite => favorite.id !== formula.id
    );
    this.favorites.next(_favorites);
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
  }

  private _updateAllSummary(): void {
    this.database.formulas.toArray().then(formulas => {
      const _formulas = formulas.map(formula => {
        return { id: formula.id, name: formula.name, desc: formula.desc };
      });
      this.all.next(_formulas);
    });
  }
  private _getRecentsSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('recent-formulas'));
  }

  private _getFavoritesSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('favorite-formulas'));
  }

  updateSpecialtiesSummary() {
    const userSpecialty: ISpecialty = JSON.parse(
      localStorage.getItem('user-specialty')
    );
    this.database.formulas
      .where('specialtyIds')
      .equals(userSpecialty.id)
      .toArray()
      .then(formulas => {
        const _formulas = formulas.map(formula => {
          return { id: formula.id, name: formula.name, desc: formula.desc };
        });
        this.specialties.next(_formulas);
      });
  }
}

export interface IFormulaStorage {
  id: number;
  name: string;
  desc: string;
}
