import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertorService {
  constructor() {}

  lbs2kg(lbs: number) {
    return (lbs * 0.45359237).toFixed(1);
  }
  kg2lbs(kg: number) {
    return (kg * 2.20462262185).toFixed(1);
  }
  in2cm(inch: number) {
    return (inch * 2.54).toFixed(0);
  }
  cm2in(cm: number) {
    return (cm * 0.3937008).toFixed(2);
  }
  mgdl2mmolL(mgdl: number) {
    return (mgdl * 0.0555).toFixed(2);
  }
  mmolL2mgdl(mmolL: number) {
    return (mmolL * 18.018).toFixed(2);
  }
}
