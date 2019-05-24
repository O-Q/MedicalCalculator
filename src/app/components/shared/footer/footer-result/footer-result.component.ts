import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { FormulaCalculatorService } from 'src/app/Services/formula-calculator.service';

@Component({
  selector: 'app-footer-result',
  templateUrl: './footer-result.component.html',
  styleUrls: ['./footer-result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterResultComponent implements OnInit {
  @Input()
  result;
  constructor() {}

  ngOnInit() {}
}
