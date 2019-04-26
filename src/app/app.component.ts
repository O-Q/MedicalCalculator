import { Component } from '@angular/core';
import { AppDatabaseService } from './Services/database/app-database.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'MedicalCalculator';
  constructor(private appDatebaseService: AppDatabaseService) {}
}
