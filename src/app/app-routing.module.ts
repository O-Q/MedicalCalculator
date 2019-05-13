import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './components/base/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';

const routes: Routes = [
  { path: '', redirectTo: 'formula', pathMatch: 'full' },
  {
    path: 'formula',
    loadChildren: 'src/app/components/formula/formula.module#FormulaModule'
  },
  {
    path: 'settings',
    loadChildren: 'src/app/components/settings/settings.module#SettingsModule'
  },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  {
    path: 'not-found',
    component: ErrorComponent,
    data: { codeError: 404, messageError: 'صفحه مورد نظر پیدا نشد.' }
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
