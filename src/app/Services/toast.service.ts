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
   * @param messageType MessageType enum should be used
   */
  show(title: string, message: string, messageType: string) {
    $('body').toast({
      title: title,
      message: message,
      class: messageType,
      showProgress: 'bottom',
      position: 'bottom center',
      displayTime: 5000
    });
  }
}
export enum MessageType {
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error'
}
