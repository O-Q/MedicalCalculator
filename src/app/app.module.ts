import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDatabaseInitService } from './Services/database/app-database-init.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

export function dbLoader(appDatabaseInitService: AppDatabaseInitService) {
  return () => appDatabaseInitService.load();
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: dbLoader,
      deps: [AppDatabaseInitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
