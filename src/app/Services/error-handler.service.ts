import { Injectable } from '@angular/core';
import { ToastService, ToastType } from './toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private _errorBlock$ = new BehaviorSubject(false);
  constructor(private toastService: ToastService) {
    this._errorBlock$.subscribe(value => {
      // when error is blocked, unblock it after 5 secs.
      if (value) {
        setTimeout(() => this._errorBlock$.next(false), 5000);
      }
    });
  }
  handleServerError(e: HttpErrorResponse) {
    if (!this._errorBlock$.getValue()) {
      this._errorBlock$.next(true);
      console.log(e);
      if (e.status === 504 || e.status === 0) {
        this.toastService.show(
          'خطای شبکه',
          'برنامه در حالت آفلاین',
          ToastType.WARNING
        );
      } else {
        console.log(e);
      }
    }
  }
}
