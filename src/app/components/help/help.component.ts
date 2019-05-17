import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
