import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private _toastLimit = 5;
  private _displayTime = 5000;

  constructor() {}

  /**
   * @param title Message title
   * @param message Text message
   * @param toastType toastType enum should be used
   */
  show(title: string, message: string, toastType: string) {
    if (this._toastLimit > 0) {
      this._toastLimit -= 1;
      setTimeout(() => (this._toastLimit += 1), this._displayTime);
      $('body').toast({
        title: title,
        message: message,
        class: toastType,
        position: 'bottom center',
        displayTime: this._displayTime
      });
    }
  }
}
export enum ToastType {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}
