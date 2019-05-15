import { NgModule } from '@angular/core';
import { ErrorComponent } from '../base/error/error.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavItemsComponent } from './sidenav-items/sidenav-items.component';

const components: any[] = [
  ErrorComponent,
  HeaderComponent,
  FooterComponent,
  SidenavItemsComponent
];
@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule
  ],
  exports: [
    components,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule
  ]
})
export class SharedModule {}
