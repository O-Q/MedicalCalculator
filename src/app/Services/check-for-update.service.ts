import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastService, ToastType } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private toast: ToastService,
    private applicationRef: ApplicationRef
  ) {}

  checkUpdate() {
    if (this._isAppUpdated()) {
      this.toast.show('برنامه با موفقیت بروزرسانی شد.', '', ToastType.SUCCESS);
    }
    const isStableSubscription = this.applicationRef.isStable.subscribe(
      isStable => {
        if (isStable) {
          // when it downloaded completely
          this.swUpdate.available.subscribe(() => {
            if (confirm('نسخه‌ی جدیدی آماده است. آیا بروزرسانی شود؟')) {
              this.toast.show(
                'برنامه در حال بروزرسانی است.',
                '',
                ToastType.INFO
              );
              this.swUpdate.activateUpdate().then(() => {
                this._setAppUpdated();
                document.location.reload();
              });
            }
          });
          isStableSubscription.unsubscribe();
        }
      }
    );
  }

  private _setAppUpdated() {
    localStorage.setItem('new-update', 'true');
  }

  /**
   * If app just updated return `true` and remove `new-update` form localStorage
   */
  private _isAppUpdated() {
    const _isUpdated = localStorage.getItem('new-update');
    if (_isUpdated === 'true') {
      localStorage.removeItem('new-update');
      return true;
    }
    return false;
  }
}
