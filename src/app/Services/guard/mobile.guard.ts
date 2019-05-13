import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class MobileGuard implements CanActivate {
  constructor(private router: Router, private baseService: BaseService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.baseService.isMobile) {
      return true;
    } else {
      this.router.navigate(['incompatible-device']);
      return false;
    }
  }
}
