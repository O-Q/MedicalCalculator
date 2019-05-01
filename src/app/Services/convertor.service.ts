import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConvertorService {
  lbs2kg(lbs: number) {
    return +(lbs * 0.4536).toFixed(1);
  }
  kg2lbs(kg: number) {
    return +(kg * 2.2046).toFixed(1);
  }
  in2cm(inch: number) {
    return +(inch * 2.54).toFixed(0);
  }
  cm2in(cm: number) {
    return +(cm * 0.3937).toFixed(2);
  }
  mgdl2mmolL(mgdl: number) {
    return +(mgdl * 0.0555).toFixed(2);
  }
  mmolL2mgdl(mmolL: number) {
    return +(mmolL * 18.018).toFixed(2);
  }
  gl2gdl(gl: number) {
    return +(0.1 * gl).toFixed(2);
  }
  gdl2gl(gdl: number) {
    return +(10 * gdl).toFixed(1);
  }
}
