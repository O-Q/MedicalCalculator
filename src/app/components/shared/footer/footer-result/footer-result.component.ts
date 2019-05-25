import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/models/result.model';

@Component({
  selector: 'app-footer-result',
  templateUrl: './footer-result.component.html',
  styleUrls: ['./footer-result.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterResultComponent implements OnInit {
  @Input()
  result$: Observable<IResult>;
  constructor() {}

  ngOnInit() {}
}
