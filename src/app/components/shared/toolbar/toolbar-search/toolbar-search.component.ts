import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ToolbarType } from 'src/app/constants/toolbar.constant';
import { Subject, BehaviorSubject } from 'rxjs';
import {
  FormulaService,
  IFormulaStorage
} from 'src/app/Services/database/formula.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSearchComponent implements OnInit, AfterViewInit {
  @Input() mode$: Subject<ToolbarType>;
  allResults = new BehaviorSubject<IFormulaStorage[]>(null);
  specialtyResults = new BehaviorSubject<IFormulaStorage[]>(null);
  favoriteResults = new BehaviorSubject<IFormulaStorage[]>(null);
  recentResults = new BehaviorSubject<IFormulaStorage[]>(null);
  input = new FormControl('');
  @ViewChild('inputTag', { static: false }) inputTag;
  constructor(private formulaService: FormulaService, private router: Router) {}
  ngOnInit(): void {
    this.input.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(text => this.onChangeInput(text));
  }
  ngAfterViewInit(): void {
    this.inputTag.nativeElement.focus();
  }

  hideSearchBar() {
    this.mode$.next(ToolbarType.MAIN);
  }

  onFormulaClick(formula: IFormulaStorage) {
    this.formulaService.addRecent(formula);
    this.router.navigate(['formula', 'detail', formula.id]);
  }

  onChangeInput(query: string) {
    if (query !== '') {
      const _query = query.toLowerCase();
      const _recents = this.formulaService.recnets.getValue();
      this.recentResults.next(this._filterFormulas(_recents, _query));

      const _favorites = this.formulaService.favorites.getValue();

      this.favoriteResults.next(this._filterFormulas(_favorites, _query));

      const _specialties = this.formulaService.specialties.getValue();
      this.specialtyResults.next(this._filterFormulas(_specialties, _query));

      const _all = this.formulaService.all.getValue();
      this.allResults.next(this._filterFormulas(_all, _query));
    }
  }

  private _filterFormulas(formulas: IFormulaStorage[], _query: string) {
    if (formulas) {
      const _result = formulas.filter(formula =>
        this._queryMatcher(formula, _query)
      );
      return _result.length !== 0 ? _result : null;
    } else {
      return null;
    }
  }
  private _queryMatcher(formula: IFormulaStorage, _query: string): boolean {
    return (
      formula.name.toLowerCase().includes(_query) ||
      formula.desc.toLowerCase().includes(_query)
    );
  }
}
