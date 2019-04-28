import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { first } from 'rxjs/operators';
import { ToastService, ToastType } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef,
    private toastService: ToastService
  ) {
    // when it downloaded completely
    this.swUpdate.available.subscribe(() => {
      if (confirm('نسخه جدیدی آماده است. آیا بروزرسانی شود؟')) {
        this.toastService.show(
          'در حال بروزرسانی',
          'بعد از بروزرسانی صفحه تازه‌سازی خواهد شد.',
          ToastType.INFO
        );
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      }
    });
    const appIsStable$ = this.appRef.isStable.pipe(
      first(isStable => isStable === true)
    );
    appIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate();
    });
  }
}
