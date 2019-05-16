import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { ToolbarType } from 'src/app/constants/toolbar.constant';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSearchComponent {
  @Input() mode$: Subject<ToolbarType>;

  constructor() {}

  hideSearchBar() {
    this.mode$.next(ToolbarType.MAIN);
  }
}
