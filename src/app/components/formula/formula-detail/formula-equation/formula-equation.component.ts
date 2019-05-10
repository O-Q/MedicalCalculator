import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { IFormula } from 'src/app/models/database.model';

@Component({
  selector: 'app-formula-equation',
  templateUrl: './formula-equation.component.html',
  styleUrls: ['./formula-equation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaEquationComponent implements OnInit {
  @Input() formula: IFormula;

  constructor() {}

  ngOnInit() {}
}
