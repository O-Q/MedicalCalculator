import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidenav-items',
  templateUrl: './sidenav-items.component.html',
  styleUrls: ['./sidenav-items.component.less']
})
export class SidenavItemsComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  constructor() {}

  ngOnInit() {}

  onItemClick() {
    this.sidenav.close();
  }
}
