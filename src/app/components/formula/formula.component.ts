import { Component, OnInit } from '@angular/core';
import { fader } from '../../Styles/route-animation';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.less'],
  animations: [fader]
})
export class FormulaComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
