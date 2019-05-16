import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  isFirstTime() {
    const _isFirstTime = localStorage.getItem('first-time');
    if (_isFirstTime === 'false') {
      return false;
    } else {
      localStorage.setItem('first-time', 'false');
      return true;
    }
  }
  resetFirstTime() {
    localStorage.setItem('first-time', 'true');
  }
  resetApp() {
    localStorage.clear();
    document.location.reload();
  }
}
