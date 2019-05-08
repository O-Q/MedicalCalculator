import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormulaService } from 'src/app/Services/database/formula.service';

@Component({
  selector: 'app-formula-list',
  templateUrl: './formula-list.component.html',
  styleUrls: ['./formula-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaListComponent implements OnInit {
  constructor(private formulaService: FormulaService) {}
  formulas$ = this.formulaService.getAll();

  ngOnInit() {}
}
