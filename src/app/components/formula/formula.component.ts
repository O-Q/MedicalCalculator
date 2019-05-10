import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { fader } from '../../Styles/route-animation';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fader]
})
export class FormulaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
