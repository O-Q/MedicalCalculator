import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormulaService,
  IFormulaStorage
} from 'src/app/Services/database/formula.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formula-list',
  templateUrl: './formula-list.component.html',
  styleUrls: ['./formula-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaListComponent {
  formulas$: Observable<IFormulaStorage[]>;
  constructor(
    private formulaService: FormulaService,
    private route: ActivatedRoute
  ) {
    const listType = this.route.snapshot.url[1].path;
    switch (listType) {
      case 'all': {
        this.formulas$ = this.formulaService.all$;
        break;
      }
      case 'favorites': {
        this.formulas$ = this.formulaService.favorites$;
        break;
      }
      case 'specialties': {
        this.formulas$ = this.formulaService.specialties$;
        break;
      }
      case 'recents': {
        this.formulas$ = this.formulaService.recents$;
        break;
      }
      default: {
        this.formulas$ = this.formulaService.specialties$;
      }
    }
  }
}
