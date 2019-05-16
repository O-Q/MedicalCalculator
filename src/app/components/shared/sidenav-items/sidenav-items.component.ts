import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SpecialtyService } from 'src/app/Services/database/specialty.service';
import { ISpecialty } from 'src/app/models/database.model';

@Component({
  selector: 'app-sidenav-items',
  templateUrl: './sidenav-items.component.html',
  styleUrls: ['./sidenav-items.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavItemsComponent {
  @Input() sidenav: MatSidenav;
  userSpecialty: ISpecialty;
  constructor(private specialtyService: SpecialtyService) {
    this.userSpecialty = this.specialtyService.getUserSpecialty();
  }

  closeSidenav() {
    this.sidenav.close();
  }
}
