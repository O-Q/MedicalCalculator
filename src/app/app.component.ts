import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CheckForUpdateService } from './Services/check-for-update.service';
import { UtilityService } from './Services/database/utility.service';
import { Router } from '@angular/router';
import { BaseService } from './Services/base.service';
import { SEOService } from './Services/seo.service';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'MedicalCalculator';
  isSearchActive;
  constructor(
    private update: CheckForUpdateService,
    private utilityService: UtilityService,
    private base: BaseService,
    private router: Router,
    private _seoService: SEOService
  ) {
    this.update.checkUpdate();
    if (this.utilityService.isFirstTime()) {
      this.router.navigate(['first-time']);
      // do something like walkthrough
    }
    this.isSearchActive = this.base.isSearchActive;
    this.base.isSearchActive.subscribe(isActive => {
      if (isActive) {
        console.log('bib');

        $('.ui.dimmer').dimmer('show');
      }
    });
    this._seoService.SEOWorker();
  }
  ngOnInit(): void {}
}
