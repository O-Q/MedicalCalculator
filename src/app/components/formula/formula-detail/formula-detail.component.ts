import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulaService } from 'src/app/Services/database/formula.service';

@Component({
  selector: 'app-formula-detail',
  templateUrl: './formula-detail.component.html',
  styleUrls: ['./formula-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaDetailComponent implements OnInit {
  formula$ = this.formulaService.get(+this.route.snapshot.params.id);
  constructor(
    private route: ActivatedRoute,
    private formulaService: FormulaService
  ) {}

  ngOnInit() {}
}
