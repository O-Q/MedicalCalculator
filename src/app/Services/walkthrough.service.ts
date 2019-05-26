import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalkthroughService {
  step = new BehaviorSubject(0);
  constructor() {}
  next() {
    this.step.next(this.step.getValue() + 1);
  }

  resetStep() {
    this.step.next(0);
  }
  disable() {
    localStorage.setItem('wt', 'false');
  }
  enable() {
    localStorage.setItem('wt', 'true');
  }
  isEnable() {
    const _ws = localStorage.getItem('ws');
    return !_ws || _ws === 'true';
  }
}
