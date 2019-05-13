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
import { ErrorComponent } from './components/base/error/error.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HelpComponent } from './components/help/help.component';
import { AboutComponent } from './components/about/about.component';

export function dbLoader(appDatabaseInitService: DatabaseService) {
  return () => appDatabaseInitService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HelpComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
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
      deps: [DatabaseService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
