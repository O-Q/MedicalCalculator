import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  isSearchActive = new Subject<boolean>();
  isMobile: boolean;
  constructor(private platform: Platform) {
    // this.isMobile = this.platform.ANDROID || this.platform.IOS;
    this.isMobile = true;
  }
}
