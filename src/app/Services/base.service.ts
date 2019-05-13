import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  isMobile: boolean;
  constructor(private platform: Platform) {
    // this.isMobile = this.platform.ANDROID || this.platform.IOS;
    this.isMobile = true;
  }
}
