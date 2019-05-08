import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormulaComponent } from './formula.component';
import { FormulaListComponent } from './formula-list/formula-list.component';
import { FormulaItemComponent } from './formula-list/formula-item/formula-item.component';

const routes: Routes = [
  {
    path: '',
    component: FormulaComponent,
    children: [{ path: 'all', component: FormulaListComponent }]
  }
];
@NgModule({
  declarations: [FormulaComponent, FormulaListComponent, FormulaItemComponent],
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class FormulaModule {}
