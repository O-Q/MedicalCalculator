import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { IFormula, IInput } from 'src/app/models/database.model';
import { IResult } from 'src/app/models/result.model';

import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { FormulaCalculatorService } from 'src/app/Services/formula-calculator.service';
import { convertable, Units } from 'src/app/constants/input-types.constant';
import { ConverterService } from 'src/app/Services/converter.service';
@Component({
  selector: 'app-formula-equation',
  templateUrl: './formula-equation.component.html',
  styleUrls: ['./formula-equation.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaEquationComponent implements OnInit {
  @Input() formula: IFormula;
  convertableTypes = convertable;
  form: FormGroup;
  isDefaultUnitInput: { [name: string]: boolean } = {};
  constructor(
    private fb: FormBuilder,
    private calc: FormulaCalculatorService,
    private converter: ConverterService
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
      this.isDefaultUnitInput[input.name] = true;
    });
    this.form = this.fb.group({ ...formControls });

    this.form.statusChanges.subscribe((status: string) => {
      if (status === 'VALID') {
        const values: number[] = [];
        // key iteration
        // tslint:disable-next-line: forin
        for (const controlName in formControls) {
          values.push(+this.form.value[controlName]);
        }
        // calculate formula with calling method with ID!
        const resultEq = +this.calc[this.formula.id](...values).toFixed(2);

        // Check Result range to show related message
        for (const c of this.formula.result.classes) {
          if (resultEq >= c.lowRange && resultEq <= c.highRange) {
            const _result: IResult = {
              value: resultEq,
              desc: c.desc,
              unit: this.formula.result.unit
            };
            this.calc.result.next(_result);
            break;
          }
        }
      }
    });
  }
  onConvert(input: IInput) {
    const inputName = input.name;
    const _value = +this.form.value[inputName];
    let _newValue: number;
    const _defaultType = Units[input.type].default;
    const _secondaryType = Units[input.type].secondary;
    if (this.isDefaultUnitInput[inputName]) {
      _newValue = this.converter[`${_defaultType}2${_secondaryType}`](_value);
      this.isDefaultUnitInput[inputName] = false;
    } else {
      _newValue = this.converter[`${_secondaryType}2${_defaultType}`](_value);
      this.isDefaultUnitInput[inputName] = true;
    }
    this.form.get(inputName).setValue(_newValue);
  }
}
