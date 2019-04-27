import { Injectable } from '@angular/core';
import { ToastService, ToastType } from './toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastService: ToastService) {}
  private _errorBlock$ = new BehaviorSubject(false);
  handleServerError(e: HttpErrorResponse) {
    if (!this._errorBlock$.getValue()) {
      this._errorBlock$.next(true);
      console.log(e);
      if (e.status === 0) {
        this.toastService.show(
          'خطای شبکه',
          'شما به اینترنت متصل نیستید.',
          ToastType.ERROR
        );
      }
    }
    setTimeout(() => this._errorBlock$.next(false), 5000);
  }
}
