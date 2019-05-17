import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { IFormula } from 'src/app/models/database.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-formula-info',
  templateUrl: './formula-info.component.html',
  styleUrls: ['./formula-info.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaInfoComponent implements OnInit {
  @Input() formula: IFormula;

  constructor(private location: Location) {}

  ngOnInit() {}
  onBack() {
    this.location.back();
  }
}
