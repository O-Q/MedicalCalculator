import { Injectable } from '@angular/core';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor() {}

  /**
   * @param title Message title
   * @param message Text message
   * @param toastType toastType enum should be used
   */
  show(title: string, message: string, toastType: string) {
    $('body').toast({
      title: title,
      message: message,
      class: toastType,
      position: 'bottom center',
      displayTime: 5000
    });
  }
}
export enum ToastType {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}
