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
import {
  FormulaService,
  IFormulaStorage
} from 'src/app/Services/database/formula.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar-back',
  templateUrl: './toolbar-back.component.html',
  styleUrls: ['./toolbar-back.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarBackComponent implements OnInit, OnDestroy {
  title$ = new BehaviorSubject(null);
  isFavorite = new BehaviorSubject<boolean>(null);
  isInfo = new BehaviorSubject<boolean>(null);
  @Input() url$: Observable<string>;
  urlSub: Subscription;
  activeFormula: IFormulaStorage;
  isShowInfoIcon: boolean;

  constructor(
    private location: Location,
    private formulaService: FormulaService,
    private route: ActivatedRoute,
    private router: Router
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
        this.isShowInfoIcon = true;
        this.formulaService.activeFormula.pipe(first()).subscribe(formula => {
          if (formula) {
            this.title$.next(formula.name);
            this.activeFormula = formula;
            this.isFavorite.next(
              this.formulaService.isFavorite(this.activeFormula.id)
            );
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.urlSub.unsubscribe();
    this.formulaService.activeFormula.next(null);
  }
  onBack() {
    if (this.isInfo.getValue()) {
      this.isInfo.next(false);
    }
    this.location.back();
  }
  // only on formula item
  onInfo() {
    if (!this.isInfo.getValue()) {
      this.router.navigate(this.route.snapshot.url, { fragment: 'info' });
      this.isInfo.next(true);
    }
  }
  // only on formula item
  onFavorite() {
    if (this.isFavorite.getValue()) {
      this.formulaService.removeFavorite(this.activeFormula);
      this.isFavorite.next(false);
    } else {
      this.formulaService.addFavorite(this.activeFormula);
      this.isFavorite.next(true);
    }
  }
}
