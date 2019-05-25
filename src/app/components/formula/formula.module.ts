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
import { UnitFaPipe } from 'src/app/pipes/unit.pipe';
import { MatTooltipModule } from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: FormulaComponent,
    children: [
      {
        path: 'list',
        redirectTo: 'list/favorites',
        data: {
          title: 'لیست',
          description: 'لیست فرمول‌ها'
        }
      },
      {
        path: 'list/all',
        component: FormulaListComponent,
        data: {
          title: 'همه',
          description: 'لیست فرمول‌ها'
        }
      },
      {
        path: 'list/favorites',
        component: FormulaListComponent,
        data: {
          title: 'علاقه‌مندی',
          description: 'لیست فرمول‌ها'
        }
      },
      {
        path: 'list/recents',
        component: FormulaListComponent,
        data: {
          title: 'اخیر',
          description: 'لیست فرمول‌ها'
        }
      },
      {
        path: 'list/specialties',
        component: FormulaListComponent,
        data: {
          title: 'تخصص',
          description: 'لیست فرمول‌ها'
        }
      },
      {
        path: 'detail/:id',
        component: FormulaDetailComponent,
        data: {
          title: 'محاسبه‌گر فرمول',
          description: 'جزئیات فرمول'
        }
      }
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
    FormulaSearchComponent,
    UnitFaPipe
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    MatTooltipModule
  ]
})
export class FormulaModule {}
