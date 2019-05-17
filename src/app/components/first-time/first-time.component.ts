import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SpecialtyService } from 'src/app/Services/database/specialty.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-first-time',
  templateUrl: './first-time.component.html',
  styleUrls: ['./first-time.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstTimeComponent implements OnInit {
  selectedSpecialtyId: string = null;
  specliaties$ = this.specialtyService.all$;
  constructor(
    private specialtyService: SpecialtyService,
    private router: Router
  ) {}

  ngOnInit() {}
  onConfirm() {
    if (this.selectedSpecialtyId) {
      this.specialtyService.saveUserSpecialty(+this.selectedSpecialtyId);
    } else {
      this.specialtyService.removeUserSpecialty();
    }
    this.router.navigate(['formula']);
  }
}
