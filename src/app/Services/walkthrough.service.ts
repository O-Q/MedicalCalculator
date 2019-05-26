import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalkthroughService {
  step = new BehaviorSubject(0);
  constructor() {}
  next() {
    if (this.isEnable()) {
      this.step.next(this.step.getValue() + 1);
    }
  }

  exitWalkthrough() {
    this.step.next(0);
    this.disable();
  }
  disable() {
    localStorage.setItem('wt', 'false');
  }
  enable() {
    localStorage.setItem('wt', 'true');
    this.next();
  }
  isEnable() {
    const _ws = localStorage.getItem('ws');
    return !_ws || _ws === 'true';
  }
}
