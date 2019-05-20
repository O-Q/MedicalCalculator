import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    $('.button').click(function () {
      $('.ui.modal')
        .modal('show');
    });
    $('.ui.dropdown')
      .dropdown();
  }
}
