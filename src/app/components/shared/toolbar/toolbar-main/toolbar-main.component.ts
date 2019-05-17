import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { ToolbarType } from 'src/app/constants/toolbar.constant';

@Component({
  selector: 'app-toolbar-main',
  templateUrl: './toolbar-main.component.html',
  styleUrls: ['./toolbar-main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarMainComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() mode$: Subject<ToolbarType>;
  constructor() {}

  ngOnInit() {}
  showSearchBar() {
    this.mode$.next(ToolbarType.SEARCH);
  }
}
