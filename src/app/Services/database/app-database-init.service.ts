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
import { LocalStorageService } from './local-storage.service';
import { first } from 'rxjs/operators';
import { tableNames } from 'src/app/constants/tables.constant';
@Injectable({ providedIn: 'root' })
export class AppDatabaseInitService extends Dexie {
  formulas: Dexie.Table<IFormula, number>;
  specialties: Dexie.Table<ISpecialty, number>;
  formulaSpecialty: Dexie.Table<IFormulaSpecialty, number>;
  creators: Dexie.Table<ICreator, number>;

  constructor(
    private fmService: FilesManagerService,
    private errorHandler: ErrorHandlerService,
    private lsService: LocalStorageService
  ) {
    super('MedicalCalculator');
  }
  load() {
    return new Promise(resolve => {
      this.version(1).stores({
        formulas:
          '++id, name, desc, form, advice, management, criticalActions, creatorId',
        specialties: '++id, name',
        formulaSpecialty: 'specialtyId, formulaId',
        creators: '++id, name, desc'
      });
      this._fetchTables();
      resolve(this);
    });
  }
  private _fetchTables() {
    // TODO: Add loading
    this.fmService.tables$.pipe(first()).subscribe(serverHashes => {
      serverHashes.forEach(hash => this._fetchTable(hash));
    });
  }

  private _fetchTable(serverTable: Hash) {
    const { Name: tableName, Hash: serverHash } = serverTable;
    if (this._isTableChanged(serverHash, tableName)) {
      this.lsService.saveHash(serverHash, tableName);
      switch (tableName) {
        case tableNames.FORMULAS: {
          this._fetchFormulas();
          break;
        }
        case tableNames.CREATORS: {
          this._fetchCreators();
          break;
        }
        case tableNames.SPECIALTIES: {
          this._fetchSpecialties();
          break;
        }
        case tableNames.FORMULASPECIALTY: {
          this._fetchFormulaSpecialty();
          break;
        }
      }
    }
  }
  private _fetchCreators() {
    this.fmService.creators$.pipe(first()).subscribe(
      creatorsDto => {
        this._putData(creatorsDto, tableNames.CREATORS);
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _fetchFormulas() {
    this.fmService.formulas$.pipe(first()).subscribe(
      formulasDto => {
        this._putData(formulasDto, tableNames.FORMULAS);
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _fetchSpecialties() {
    this.fmService.specialties$.pipe(first()).subscribe(
      specialtiesDto => {
        this._putData(specialtiesDto, tableNames.CREATORS);
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _fetchFormulaSpecialty() {
    this.fmService.formulaSpecialty$.pipe(first()).subscribe(
      formulaSpecialtyDto => {
        this._putData(formulaSpecialtyDto, tableNames.FORMULASPECIALTY);
      },
      error => this.errorHandler.handleServerError(error)
    );
  }

  /**
   * Compare local hash with server hash with each other.
   * @param serverHash The hash which came from the server
   * @param tableName Table name. for getting hash stored in local Storage.
   */
  private _isTableChanged(serverHash: string, tableName: string) {
    return serverHash !== this.lsService.getHash(tableName);
  }

  /**
   * Put data in related table in indexedDB
   * @param array Array-like json
   * @param tableName Table name to store
   */
  private _putData(array, tableName: string) {
    if (array) {
      array.forEach((item: any) => {
        this.table(tableName).put(item);
      });
    }
  }
}
