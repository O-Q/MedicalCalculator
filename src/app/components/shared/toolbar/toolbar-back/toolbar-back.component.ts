import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ToolbarTitle } from 'src/app/constants/toolbar.constant';
import { Location } from '@angular/common';
import { FormulaDetailRegex } from 'src/app/constants/regex.constant';
import { FormulaService } from 'src/app/Services/database/formula.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-toolbar-back',
  templateUrl: './toolbar-back.component.html',
  styleUrls: ['./toolbar-back.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarBackComponent implements OnInit, OnDestroy {
  @Input() url$: Observable<string>;
  title$ = new BehaviorSubject(null);
  urlSub: Subscription;
  constructor(
    private location: Location,
    private formulaService: FormulaService
  ) {}

  ngOnInit() {
    this.urlSub = this.url$.subscribe(url => {
      if (url === '/settings') {
        this.title$.next(ToolbarTitle.SETTINGS);
      } else if (url === '/help') {
        this.title$.next(ToolbarTitle.HELP);
      } else if (url === '/about-us') {
        this.title$.next(ToolbarTitle.ABOUTUS);
      } else if (url === '/contact-us') {
        this.title$.next(ToolbarTitle.CONTACTUS);
      } else if (url.match(FormulaDetailRegex)) {
        this.formulaService.activeFormula
          .pipe(first())
          .subscribe(formulaName => {
            this.title$.next(formulaName);
          });
      }
    });
  }
  ngOnDestroy() {
    this.urlSub.unsubscribe();
  }
  onBack() {
    this.location.back();
  }
}
