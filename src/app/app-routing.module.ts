import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './components/base/error/error.component';
import { AboutComponent } from './components/about/about.component';
import { HelpComponent } from './components/help/help.component';
import { MobileGuard } from './Services/guard/mobile.guard';
import { FirstTimeComponent } from './components/first-time/first-time.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'formula/list',
    pathMatch: 'full'
  },
  {
    path: 'first-time',
    component: FirstTimeComponent,
    data: {
      title: 'به برنامه خوش آمدید',
      description: 'صفحه اصلی'
    }
  },
  {
    path: 'formula',
    loadChildren: () => import('src/app/components/formula/formula.module').then(m => m.FormulaModule),
    canActivate: [MobileGuard],
    data: {
      title: 'فرمول‌ها',
      description: 'صفحه اصلی'
    }
  },
  {
    path: 'settings',
    loadChildren: () => import('src/app/components/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [MobileGuard],
    data: {
      title: 'تنظیمات',
      description: 'صفحه جانبی'
    }
  },
  {
    path: 'about-us',
    component: AboutComponent,
    data: {
      title: 'درباره ما',
      description: 'صفحه جانبی'
    }
  },
  {
    path: 'help',
    component: HelpComponent,
    data: {
      title: 'راهنمایی',
      description: 'صفحه جانبی'
    }
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: {
      title: 'تماس با ما',
      description: 'صفحه جانبی'
    }
  },
  {
    path: 'not-found',
    component: ErrorComponent,
    data: {
      codeError: 404,
      messageError: 'صفحه مورد نظر پیدا نشد.',
      title: 'پیدا نشد',
      description: 'خطا'
    }
  },
  {
    path: 'incompatible-device',
    component: ErrorComponent,
    data: {
      codeError: 423,
      messageError: 'در حال حاضر این برنامه فقط در تلفن همراه قابل اجراست.',
      title: 'دستگاه ناسازگار',
      description: 'خطا'
    }
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
