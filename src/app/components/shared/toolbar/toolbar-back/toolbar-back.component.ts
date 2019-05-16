import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  ToolbarTitle,
  ToolbarFormulaDetailRegex
} from 'src/app/constants/toolbar.constant';
import { Location } from '@angular/common';

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
  constructor(private location: Location) {}

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
      } else if (url.match(ToolbarFormulaDetailRegex)) {
        console.log(url);
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
