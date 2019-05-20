import {
  Component,
  Input,
  ChangeDetectionStrategy,
  Output
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { ToolbarType } from 'src/app/constants/toolbar.constant';
import { FormulaListRegex } from 'src/app/constants/regex.constant';
import { BaseService } from 'src/app/Services/base.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {
  ToolbarType = ToolbarType;
  @Input() sidenav: MatSidenav;
  mode$ = new Subject<ToolbarType>();
  url$ = new BehaviorSubject(null);
  constructor(public router: Router, private base: BaseService) {
    this.mode$.subscribe(x => this.base.isSearchActive.next(x === 'search'));
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.url$.next(url);
        if (url.match(FormulaListRegex)) {
          this.mode$.next(ToolbarType.MAIN);
        } else if (url === '/first-time') {
          this.mode$.next(ToolbarType.HIDDEN);
        } else {
          this.mode$.next(ToolbarType.BACK);
        }
      }
    });
  }
}
