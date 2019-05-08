import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  dataError$: Observable<Data> = this.route.data;
  constructor(private route: ActivatedRoute, private title: Title) {
    this.title.setTitle('خطا - صفحه مورد نظر پیدا نشد!');
  }
}
