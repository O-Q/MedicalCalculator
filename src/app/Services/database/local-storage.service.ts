import { Injectable } from '@angular/core';

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
  saveUserSpecialty(specialty: string) {
    localStorage.setItem('user-specialty', specialty);
  }
  getUserSpecialty() {
    return localStorage.getItem('user-specialty');
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

  addFavorites(formula: IFormulaStorage) {
    const _favorites: IFormulaStorage[] = this.getFavorites();
    _favorites.push(formula);
    this.saveFavorites(_favorites);
  }

  saveFavorites(favotites: IFormulaStorage[]) {
    return localStorage.setItem('favorites', JSON.stringify(favotites));
  }

  getFavorites(): IFormulaStorage[] {
    return JSON.parse(localStorage.getItem('favorites'));
  }
}

interface IFormulaStorage {
  id: number;
  name: string;
}
