import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormulaCalculatorService } from 'src/app/Services/formula-calculator.service';

@Component({
  selector: 'app-footer-result',
  templateUrl: './footer-result.component.html',
  styleUrls: ['./footer-result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterResultComponent implements OnInit {
  result$ = this.calc.result.asObservable();
  constructor(private calc: FormulaCalculatorService) {}

  ngOnInit() {}
}
