import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './Services/database/database.service';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SharedModule } from './components/shared/shared.module';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FirstTimeComponent } from './components/first-time/first-time.component';

export function dbLoader(appDatabaseInitService: DatabaseService) {
  return () => appDatabaseInitService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    ContactUsComponent,
    AboutComponent,
    FirstTimeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: dbLoader,
      deps: [DatabaseService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
