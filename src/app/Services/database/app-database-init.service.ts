import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { FilesManagerService } from './files-manager.service';
import {
  IFormula,
  ISpecialty,
  IFormulaSpecialty,
  ICreator
} from 'src/app/models/database.model';
import { ErrorHandlerService } from '../error-handler.service';
@Injectable({ providedIn: 'root' })
export class AppDatabaseInitService extends Dexie {
  tableNames = { CREATORS: 'creators', FORMULAS: 'formulas' };
  formulas: Dexie.Table<IFormula, number>;
  specialties: Dexie.Table<ISpecialty, number>;
  formulaSpecialty: Dexie.Table<IFormulaSpecialty, number>;
  creators: Dexie.Table<ICreator, number>;

  constructor(
    private fmService: FilesManagerService,
    private errorHandler: ErrorHandlerService
  ) {
    super('MedicalCalculator');
  }
  load() {
    return new Promise(resolve => {
      this.version(1).stores({
        formulas:
          '++id, name, desc, form, advice, management, criticalActions, creatorId, isFav',
        specialties: '++id, name',
        formulaSpecialty: '++id, specialtyId, formulaId',
        creators: '++id, name, desc'
      });
      this._fetchTables();
      resolve(this);
    });
  }

  private _fetchTables() {
    this._fetchCreators();
    this._fetchFormulas();
  }

  private _fetchCreators() {
    this.fmService.getCreatorsHash().subscribe(
      creatorHash => {
        if (this._isFileChanged(creatorHash, this.tableNames.CREATORS)) {
          this._updateTableHash(creatorHash, this.tableNames.CREATORS);
          this.fmService.getCreators().subscribe(
            creatorsDto => {
              this._putData(creatorsDto, this.tableNames.CREATORS);
            },
            error => this.errorHandler.handleServerError(error)
          );
        }
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _fetchFormulas() {
    this.fmService.getFormulasHash().subscribe(
      formulaHash => {
        if (this._isFileChanged(formulaHash, this.tableNames.FORMULAS)) {
          this._updateTableHash(formulaHash, this.tableNames.FORMULAS);
          this.fmService.getFormulas().subscribe(
            formulasDto => {
              this._putData(formulasDto, this.tableNames.FORMULAS);
            },
            error => this.errorHandler.handleServerError(error)
          );
        }
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _isFileChanged(serverHash: string, tableName: string) {
    return serverHash !== localStorage.getItem(`${tableName}-hash`);
  }
  private _updateTableHash(serverHash: string, tableName: string) {
    localStorage.setItem(`${tableName}-hash`, serverHash);
  }
  private _putData(array, tableName: string) {
    array.forEach(item => {
      this.table(tableName).put(item);
    });
  }
}
