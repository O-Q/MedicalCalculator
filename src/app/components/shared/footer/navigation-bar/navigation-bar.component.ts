import { Component, OnInit } from '@angular/core';
import { SpecialtyService } from 'src/app/Services/database/specialty.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent implements OnInit {
  userSpecialty$ = this.specialtyService.userSpecialty$;
  constructor(private specialtyService: SpecialtyService) {}

  ngOnInit() {}
}
