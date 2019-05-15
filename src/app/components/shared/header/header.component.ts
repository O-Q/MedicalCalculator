import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  searchbar: boolean = false;

  ngOnInit() { }

  showSearchBar() {
    this.searchbar = true;
  }

  hideSearchBar() {
    // console.log($('#searchbar'));
    // $('#searchbar').transition('side right');
    this.searchbar = false;
  }
}
