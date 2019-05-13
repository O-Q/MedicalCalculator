import { NgModule } from '@angular/core';
import { ErrorComponent } from '../base/error/error.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';

const components: any[] = [
  ErrorComponent,
  HeaderComponent,
  FooterComponent,
  SidenavComponent
];
@NgModule({
  declarations: [components],
  imports: [CommonModule, RouterModule],
  exports: [components, CommonModule]
})
export class SharedModule {}
