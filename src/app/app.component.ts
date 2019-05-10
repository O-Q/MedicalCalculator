import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ToastService, ToastType } from './Services/toast.service';
import { CheckForUpdateService } from './Services/check-for-update.service';
import { UtilityService } from './Services/database/utility.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'MedicalCalculator';
  constructor(
    private toastService: ToastService,
    private update: CheckForUpdateService,
    private utilityService: UtilityService
  ) {
    this.update.checkUpdate();
    if (this.utilityService.isFirstTime()) {
      this.toastService.show('', 'اولین بارته!', ToastType.INFO);
      // do something like walkthrough
    }
  }

  ngOnInit(): void {
    $(document).ready(() => {
      $('#menu-toggle').click(() => {
        $('.ui.sidebar')
          .sidebar('toggle')
          .sidebar({ context: $('app-root') });
      });
    });
  }
}
