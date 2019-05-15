import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ToastService, ToastType } from './Services/toast.service';
import { CheckForUpdateService } from './Services/check-for-update.service';
import { UtilityService } from './Services/database/utility.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'MedicalCalculator';
  constructor(
    private toastService: ToastService,
    private update: CheckForUpdateService,
    private utilityService: UtilityService,
    private router: Router
  ) {
    this.update.checkUpdate();
    if (this.utilityService.isFirstTime()) {
      this.toastService.show('', 'اولین بارته!', ToastType.INFO);
      this.router.navigate(['first-time']);
      // do something like walkthrough
    }
  }
}
