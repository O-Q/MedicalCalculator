import { Component } from '@angular/core';
import { LocalStorageService } from './Services/database/local-storage.service';
import { ToastService, ToastType } from './Services/toast.service';
import { CheckForUpdateService } from './Services/check-for-update.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'MedicalCalculator';
  constructor(
    private lsService: LocalStorageService,
    private toastService: ToastService,
    private update: CheckForUpdateService
  ) {
    this.update.checkUpdate();
    if (this.lsService.isFirstTime()) {
      this.toastService.show('', 'اولین بارته!', ToastType.INFO);
      // do something like walkthrough
    }
  }
}
