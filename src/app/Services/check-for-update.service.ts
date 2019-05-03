import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { LocalStorageService } from './database/local-storage.service';
import { ToastService, ToastType } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class CheckForUpdateService {
  constructor(
    private swUpdate: SwUpdate,
    private ls: LocalStorageService,
    private toast: ToastService
  ) {}

  checkUpdate() {
    if (this.ls.isUpdated()) {
      this.toast.show('برنامه با موفقیت بروزرسانی شد.', '', ToastType.SUCCESS);
    }
    // when it downloaded completely
    this.swUpdate.available.subscribe(() => {
      if (confirm('نسخه‌ی جدیدی آماده است. آیا بروزرسانی شود؟')) {
        this.swUpdate.activateUpdate().then(() => {
          this.ls.setUpdated();
          document.location.reload();
        });
      }
    });
  }
}
