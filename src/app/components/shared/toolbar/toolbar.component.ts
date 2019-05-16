import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Router, NavigationEnd, Event } from '@angular/router';
import {
  ToolbarType,
  ToolbarMainURLRegex
} from 'src/app/constants/toolbar.constant';

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
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.url$.next(url);
        if (url.match(ToolbarMainURLRegex)) {
          this.mode$.next(ToolbarType.MAIN);
        } else if (url === '/first-time') {
          this.mode$.next(null);
        } else {
          this.mode$.next(ToolbarType.BACK);
        }
      }
    });
  }
}
