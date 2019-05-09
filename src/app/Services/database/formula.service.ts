import { Injectable } from '@angular/core';
import { IFormula, ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private recnets = new BehaviorSubject(this._getRecentsSummary());
  private favorites = new BehaviorSubject(this._getFavoritesSummary());
  private specialties = new BehaviorSubject(this._getSpecialtiesSummary());
  private all = new BehaviorSubject(null);
  recents$ = this.recnets.asObservable();
  favorites$ = this.favorites.asObservable();
  specialties$ = this.specialties.asObservable();
  all$ = this.all.asObservable();
  private list: Subject<IFormulaStorage[]> = new Subject();
  list$ = this.list.asObservable();
  recentLimit = 10;
  constructor(private database: DatabaseService) {
    this.getAll();
  }

  get(formulaId: number): Promise<IFormula> {
    return this.database.formulas.get(formulaId);
  }
  private getAll() {
    this.database.formulas.toArray().then(formulas => {
      const _formulas = formulas.map(formula => {
        return { id: formula.id, name: formula.name, desc: formula.desc };
      });
      this.all.next(_formulas);
    });
  }

  updateSpecialtiesSummary(specialty: ISpecialty) {
    this._getBySpecialty(specialty).then(formulas => {
      const _specialties: IFormulaStorage[] = formulas.map(formula => {
        return { id: formula.id, name: formula.name, desc: formula.desc };
      });
      this.specialties.next(_specialties);
      localStorage.setItem('specialty-formulas', JSON.stringify(_specialties));
    });
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

  private _getRecentsSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('recent-formulas'));
  }

  private _getFavoritesSummary(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('favorite-formulas'));
  }
  private _getSpecialtiesSummary(): IFormulaStorage[] {
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
