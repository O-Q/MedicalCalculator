import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { ICreator, IFormula } from 'src/app/models/database.model';

@Injectable({
  providedIn: 'root'
})
export class FilesManagerService {
  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  getCreators() {
    const headers = this.configService.getDefaultHeader();
    return this.httpClient.get<ICreator[]>(
      this.configService.getFile('creators'),
      { headers: headers }
    );
  }
  getCreatorsHash() {
    const headers = this.configService.getDefaultHeader();
    return this.httpClient.get<string>(this.configService.getHash('creators'), {
      headers: headers
    });
  }
  getFormulas() {
    const headers = this.configService.getDefaultHeader();
    return this.httpClient.get<IFormula[]>(
      this.configService.getFile('formulas'),
      { headers: headers }
    );
  }
  getFormulasHash() {
    const headers = this.configService.getDefaultHeader();
    return this.httpClient.get<string>(this.configService.getHash('formulas'), {
      headers: headers
    });
  }
}
