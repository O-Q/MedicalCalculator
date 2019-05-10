import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { FormulaService } from 'src/app/Services/database/formula.service';

@Component({
  selector: 'app-formula-detail',
  templateUrl: './formula-detail.component.html',
  styleUrls: ['./formula-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormulaDetailComponent implements OnInit, OnDestroy {
  formula$ = this.formulaService.get(+this.route.snapshot.params.id);
  showInfo$ = new Subject<boolean>();
  private _fragment: Subscription;
  constructor(
    private route: ActivatedRoute,
    private formulaService: FormulaService
  ) {
    this._fragment = this.route.fragment.subscribe(fragment => {
      fragment === 'info'
        ? this.showInfo$.next(true)
        : this.showInfo$.next(false);
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this._fragment.unsubscribe();
  }
}
