import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  // weight
  lbs2kg(lbs: number) {
    return +(lbs / 2.2046).toFixed(1);
  }
  kg2lbs(kg: number) {
    return +(kg * 2.2046).toFixed(1);
  }

  // height
  in2cm(inch: number) {
    return +(inch * 2.54).toFixed(0);
  }
  cm2in(cm: number) {
    return +(cm / 2.54).toFixed(2);
  }

  // density
  mgdl2mmolL(mgdl: number) {
    return +(mgdl / 18.018).toFixed(2);
  }
  mmolL2mgdl(mmolL: number) {
    return +(mmolL * 18.018).toFixed(2);
  }

  // pressure
  kPa2mmHg(kPa: number) {
    return +(kPa * 7.501).toFixed(2);
  }
  mmHg2kPa(mmHg: number) {
    return +(mmHg / 7.501).toFixed();
  }

  // gl2gdl(gl: number) {
  //   return +(0.1 * gl).toFixed(2);
  // }
  // gdl2gl(gdl: number) {
  //   return +(10 * gdl).toFixed(1);
  // }
}
