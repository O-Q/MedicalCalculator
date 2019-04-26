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
    return this.httpClient.get<ICreator[]>(
      this.configService.getFile('creators')
    );
  }
  getCreatorsHash() {
    return this.httpClient.get<string>(this.configService.getHash('creators'));
  }
  getFormulas() {
    return this.httpClient.get<IFormula[]>(
      this.configService.getFile('formulas')
    );
  }
  getFormulasHash() {
    return this.httpClient.get<string>(this.configService.getHash('formulas'));
  }
}
