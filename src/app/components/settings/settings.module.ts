import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material';
import { WalkthroughModule } from 'ngx-walkthrough';

const routes: Routes = [
  {
    path: '',
    component: SettingsComponent
  }
];
@NgModule({
  declarations: [SettingsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    MatRippleModule,
    WalkthroughModule
  ]
})
export class SettingsModule {}
