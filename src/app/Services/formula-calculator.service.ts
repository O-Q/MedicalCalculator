import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IResult } from 'src/app/models/result.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaCalculatorService {
  result = new Subject<IResult>();
  constructor() {}
  private getSum(total: number, arg: number) {
    return total + arg;
  }
  1(sex, age, weight, creatinine, height) {
    // TODO: no height
    // Sex 0: Man, Sex 1: Woman
    const sexRatio = sex === 1 ? 0.85 : 1;
    return ((140 - age) * weight * sexRatio) / (72 * creatinine);
  }
  2(...args: number[]) {
    return args.reduce(this.getSum);
  }
  3(...args: number[]) {
    return args.reduce(this.getSum);
  }
  4(weight, desiredPlasmaDose, unitVolume) {
    return Math.round((weight * desiredPlasmaDose) / unitVolume);
  }
  5(...args: number[]) {
    return args.reduce(this.getSum);
  }
  6(...args: number[]) {
    return args.reduce(this.getSum);
  }
}
