import { Injectable } from '@angular/core';
import { IFormula, ISpecialty } from 'src/app/models/database.model';
import { DatabaseService } from './database.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastService, ToastType } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class FormulaService {
  private recnets = new BehaviorSubject(this._getRecentsSummary());
  private favorites = new BehaviorSubject(this._getFavoritesSummary());
  private specialties = new BehaviorSubject(null);
  all: BehaviorSubject<IFormulaStorage[]> = this.database.allFormula$;
  recents$ = this.recnets.asObservable();
  favorites$ = this.favorites.asObservable();
  specialties$ = this.specialties.asObservable();
  all$ = this.all.asObservable();
  activeFormula = new Subject();
  recentLimit = 10;
  constructor(private database: DatabaseService, private toast: ToastService) {
    this.updateSpecialtiesSummary();
  }

  async get(formulaId: number): Promise<IFormula> {
    return this.database.formulas.get(formulaId).then(formula => {
      this.activeFormula.next(formula.name);
      return formula;
    });
  }

  addRecent(formula: IFormulaStorage) {
    let _recents = this.recnets.getValue();
    if (!_recents) {
      _recents = [];
    }
    const isFormulaNotExist = !_recents.find(
      recent => recent.id === formula.id
    );
    if (isFormulaNotExist) {
      while (_recents.length >= this.recentLimit) {
        _recents.shift();
      }
      _recents.push(formula);
      this.recnets.next(_recents);
      localStorage.setItem('recent-formulas', JSON.stringify(_recents));
    }
  }

  addFavorite(formula: IFormulaStorage | IFormula) {
    const _formulaStorage: IFormulaStorage = {
      id: formula.id,
      name: formula.name,
      desc: formula.desc
    };
    let _favorites = this.favorites.getValue();
    if (!_favorites) {
      _favorites = [];
    }
    _favorites.push(_formulaStorage);
    this.favorites.next(_favorites);
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
    this.toast.show('پیام', 'فرمول به علاقه‌مندی اضافه شد.', ToastType.SUCCESS);
  }
  isFavorite(formulaId: number) {
    if (this.favorites.getValue()) {
      for (const formula of this.favorites.getValue()) {
        if (formula.id === formulaId) {
          return true;
        }
      }
    }
    return false;
  }

  removeFavorite(formula: IFormulaStorage) {
    const _favorites = this.favorites.value.filter(
      favorite => favorite.id !== formula.id
    );
    this.favorites.next(_favorites);
    localStorage.setItem('favorite-formulas', JSON.stringify(_favorites));
    this.toast.show('پیام', 'فرمول از علاقه‌مندی حذف شد.', ToastType.INFO);
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

    if (userSpecialty) {
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
}

export interface IFormulaStorage {
  id: number;
  name: string;
  desc: string;
}
