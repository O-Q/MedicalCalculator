import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ToastService, ToastType } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {
  constructor(private swUpdate: SwUpdate, private toast: ToastService) {}

  checkUpdate() {
    if (this._isAppUpdated()) {
      this.toast.show('برنامه با موفقیت بروزرسانی شد.', '', ToastType.SUCCESS);
    }
    // when it downloaded completely
    this.swUpdate.available.subscribe(() => {
      if (confirm('نسخه‌ی جدیدی آماده است. آیا بروزرسانی شود؟')) {
        this.swUpdate.activateUpdate().then(() => {
          this._setAppUpdated();
          document.location.reload();
        });
      }
    });
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
