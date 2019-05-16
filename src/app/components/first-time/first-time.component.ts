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
  selectedSpecialtyId: string;
  specliaties$ = this.specialtyService.getAll();
  constructor(
    private specialtyService: SpecialtyService,
    private router: Router
  ) {}

  ngOnInit() {}
  onConfirm() {
    if (this.selectedSpecialtyId) {
      this.specialtyService.saveUserSpecialty(+this.selectedSpecialtyId);
      this.router.navigate(['formula']);
    }
  }
}
