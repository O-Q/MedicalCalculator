import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { IFormula } from 'src/app/models/database.model';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FormulaCalculatorService } from 'src/app/Services/formula-calculator.service';

@Component({
  selector: 'app-formula-equation',
  templateUrl: './formula-equation.component.html',
  styleUrls: ['./formula-equation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaEquationComponent implements OnInit {
  @Input() formula: IFormula;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private calc: FormulaCalculatorService
  ) {}

  ngOnInit() {
    const formControls: { [name: string]: FormControl } = {};
    this.formula.form.selects.forEach(select => {
      formControls[select.name] = new FormControl('', {
        validators: [Validators.required]
      });
    });
    this.formula.form.inputs.forEach(input => {
      formControls[input.name] = new FormControl('', {
        validators: [Validators.required]
      });
    });
    this.form = this.fb.group({ ...formControls });
    console.log(this.form);

    this.form.statusChanges.subscribe((status: string) => {
      console.log('form status changes provoke!');

      if (status === 'VALID') {
        const values: number[] = [];
        // tslint:disable-next-line: forin
        for (const controlName in formControls) {
          values.push(+this.form.value[controlName]);
        }
        const result = this.calc[this.formula.id](...values);
        console.log(result);
        for (const c of this.formula.result.classes) {
          // maybe is not a number. convert with + needed
          if (result > c.lowRange && result < c.highRange) {
            console.log(c.desc);
            break;
          }
        }
      }
    });
  }
}
