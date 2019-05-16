import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {
  FormulaDetailRegex,
  FormulaListRegex
} from 'src/app/constants/regex.constant';
import { BehaviorSubject } from 'rxjs';
import { FooterType } from 'src/app/constants/footer.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  FooterType = FooterType;
  mode$ = new BehaviorSubject(null);
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        if (url.match(FormulaDetailRegex)) {
          this.mode$.next(FooterType.RESULT);
        } else if (url.match(FormulaListRegex)) {
          this.mode$.next(FooterType.MAIN);
        } else {
          this.mode$.next(FooterType.HIDDEN);
        }
      }
    });
  }

  ngOnInit() {}
}
