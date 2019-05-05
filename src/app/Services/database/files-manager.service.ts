import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import {
  ICreator,
  IFormula,
  ISpecialty,
  IFormulaSpecialty
} from 'src/app/models/database.model';
import { tableNames } from 'src/app/constants/tables.constant';

@Injectable({
  providedIn: 'root'
})
/**
 * Get files and hash of the files
 */
export class FilesManagerService {
  headers = this.configService.getDefaultHeader();

  formulas$ = this.http.get<IFormula[]>(
    this.configService.getFile(tableNames.FORMULAS),
    {
      headers: this.headers
    }
  );

  creators$ = this.http.get<ICreator[]>(
    this.configService.getFile(tableNames.CREATORS),
    { headers: this.headers }
  );

  specialties$ = this.http.get<ISpecialty[]>(
    this.configService.getFile(tableNames.SPECIALTIES),
    { headers: this.headers }
  );

  formulaSpecialty$ = this.http.get<IFormulaSpecialty[]>(
    this.configService.getFile(tableNames.FORMULASPECIALTY),
    { headers: this.headers }
  );

  tables$ = this.http.get<Hash[]>(this.configService.getHashes(), {
    headers: this.headers
  });

  constructor(private http: HttpClient, private configService: ConfigService) {}
}
