import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { Routes, RouterModule } from '@angular/router';
import { FormulaComponent } from '../formula/formula.component';

const routes: Routes = [
  {
    path: '',
    component: FormulaComponent
  }
];
@NgModule({
  declarations: [SettingsComponent],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class SettingsModule {}
