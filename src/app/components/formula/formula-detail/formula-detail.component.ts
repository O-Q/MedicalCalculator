import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormulaService } from 'src/app/Services/database/formula.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-formula-detail',
  templateUrl: './formula-detail.component.html',
  styleUrls: ['./formula-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaDetailComponent implements OnInit {
  formula$ = this.formulaService.get(+this.route.snapshot.params.id);
  showInfo$ = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private formulaService: FormulaService
  ) {
    this.route.fragment.subscribe(fragment => {
      fragment === 'info'
        ? this.showInfo$.next(true)
        : this.showInfo$.next(false);
    });
  }

  ngOnInit() {}
}
