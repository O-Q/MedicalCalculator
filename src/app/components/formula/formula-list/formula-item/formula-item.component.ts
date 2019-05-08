import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-formula-item',
  templateUrl: './formula-item.component.html',
  styleUrls: ['./formula-item.component.less']
})
export class FormulaItemComponent implements OnInit {
  @Input() formula;
  constructor() {}

  ngOnInit() {}
}
