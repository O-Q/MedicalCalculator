import { NgModule } from '@angular/core';
import { ErrorComponent } from '../base/error/error.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './sidenav-items/sidenav-items.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { NavigationBarComponent } from './footer/navigation-bar/navigation-bar.component';
import { ToolbarMainComponent } from './toolbar/toolbar-main/toolbar-main.component';
import { ToolbarSearchComponent } from './toolbar/toolbar-search/toolbar-search.component';
import { ToolbarBackComponent } from './toolbar/toolbar-back/toolbar-back.component';
import { FooterResultComponent } from './footer/footer-result/footer-result.component';
import { SearchItemComponent } from './toolbar/toolbar-search/search-item/search-item.component';
import { MatRippleModule } from '@angular/material';
import { WalkthroughModule } from 'ngx-walkthrough';

const components: any[] = [
  ErrorComponent,
  ToolbarComponent,
  SidenavItemsComponent,
  FooterComponent,
  NavigationBarComponent,
  ToolbarMainComponent,
  ToolbarSearchComponent,
  ToolbarBackComponent,
  FooterResultComponent,
  SearchItemComponent
];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatRippleModule
  ],
  exports: [
    components,
    CommonModule,
    FormsModule,
    MatSidenavModule,
    MatRippleModule
  ]
})
export class SharedModule {}
