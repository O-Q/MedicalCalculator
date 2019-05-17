import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ToolbarType } from 'src/app/constants/toolbar.constant';
import { Subject } from 'rxjs';
import { ToastService, ToastType } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarSearchComponent {
  @Input() mode$: Subject<ToolbarType>;

  constructor(private test: ToastService) {}

  hideSearchBar() {
    this.mode$.next(ToolbarType.MAIN);
  }
  search(event) {
    // event.target.value;
    console.log(event.target.value);
  }
}
