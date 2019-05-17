import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormulaComponent } from './formula.component';
import { FormulaListComponent } from './formula-list/formula-list.component';
import { FormulaItemComponent } from './formula-list/formula-item/formula-item.component';
import { FormulaDetailComponent } from './formula-detail/formula-detail.component';
import { FormulaEquationComponent } from './formula-detail/formula-equation/formula-equation.component';
import { FormulaInfoComponent } from './formula-detail/formula-info/formula-info.component';
import { FormulaSearchComponent } from './formula-list/formula-search/formula-search.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FormulaComponent,
    children: [
      { path: 'list', redirectTo: 'list/favorites' },
      { path: 'list/all', component: FormulaListComponent },
      { path: 'list/favorites', component: FormulaListComponent },
      { path: 'list/recents', component: FormulaListComponent },
      { path: 'list/specialties', component: FormulaListComponent },
      { path: 'detail/:id', component: FormulaDetailComponent }
    ]
  }
];
@NgModule({
  declarations: [
    FormulaComponent,
    FormulaListComponent,
    FormulaItemComponent,
    FormulaDetailComponent,
    FormulaEquationComponent,
    FormulaInfoComponent,
    FormulaSearchComponent
  ],
  imports: [RouterModule.forChild(routes), CommonModule, ReactiveFormsModule]
})
export class FormulaModule {}
