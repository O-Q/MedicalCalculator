import { Injectable } from '@angular/core';
import { ISpecialty, IFormula } from 'src/app/models/database.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveHash(serverHash: string, tableName: string) {
    localStorage.setItem(`${tableName}-hash`, serverHash);
  }
  getHash(tableName: string) {
    return localStorage.getItem(`${tableName}-hash`);
  }

  saveUserSpecialty(specialty: ISpecialty) {
    localStorage.setItem('user-specialty', JSON.stringify(specialty));
  }

  getUserSpecialty(): ISpecialty {
    return JSON.parse(localStorage.getItem('user-specialty'));
  }

  isFirstTime() {
    const _isFirstTime = localStorage.getItem('first-time');
    if (_isFirstTime === 'false') {
      return false;
    } else {
      // maybe somewhere, I set it true
      localStorage.setItem('first-time', 'false');
      return true;
    }
  }
  resetFirstTime() {
    localStorage.setItem('first-time', 'true');
  }
  setUpdated() {
    localStorage.setItem('new-update', 'true');
  }
  isUpdated() {
    const _isUpdated = localStorage.getItem('new-update');
    if (_isUpdated === 'true') {
      localStorage.removeItem('new-update');
      return true;
    }
    return false;
  }

  private _saveFavorites(favotites: IFormulaStorage[]) {
    localStorage.setItem('favorites', JSON.stringify(favotites));
  }

  addFavorite(formula: IFormulaStorage) {
    const _favorites = this.getFavorites();
    _favorites.push(formula);
    this._saveFavorites(_favorites);
  }

  getFavorites(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('favorites'));
  }

  private _saveSpecialtyFavorites(specialtyFavorites: IFormulaStorage[]) {
    localStorage.setItem(
      'specialty-favorites',
      JSON.stringify(specialtyFavorites)
    );
  }

  getSpecialtyFavorites(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('specialty-favorites'));
  }

  addSpecialtyFavorite(formula: IFormulaStorage) {
    const _favorites = this.getSpecialtyFavorites();
    _favorites.push(formula);
    this._saveSpecialtyFavorites(_favorites);
  }
}

export interface IFormulaStorage {
  id: number;
  name: string;
}
