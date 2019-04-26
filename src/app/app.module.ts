import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppDatabaseInitService } from './Services/database/app-database-init.service';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';

export function dbLoader(appDatabaseInitService: AppDatabaseInitService) {
  return () => appDatabaseInitService.load();
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule
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
