import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpecialtyService } from 'src/app/Services/database/specialty.service';
import { UtilityService } from 'src/app/Services/database/utility.service';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  specialties$ = this.specialtyService.all$;
  userSpecialty$ = this.specialtyService.userSpecialty$;

  constructor(
    private specialtyService: SpecialtyService,
    private utility: UtilityService
  ) {}

  ngOnInit() {
    $('.button').click(function() {
      $('.ui.modal').modal('show');
    });
    $('.ui.dropdown').dropdown();
  }
  onChangeSpecialty(specialtyId: number) {
    this.specialtyService.saveUserSpecialty(+specialtyId);
  }
  onResetApp() {
    this.utility.resetApp();
  }
}
