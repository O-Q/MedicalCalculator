import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SpecialtyService } from 'src/app/Services/database/specialty.service';

@Component({
  selector: 'app-sidenav-items',
  templateUrl: './sidenav-items.component.html',
  styleUrls: ['./sidenav-items.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavItemsComponent {
  @Input() sidenav: MatSidenav;
  userSpecialty$ = this.specialtyService.userSpecialty$;
  constructor(private specialtyService: SpecialtyService) {}

  closeSidenav() {
    this.sidenav.close();
  }
}
