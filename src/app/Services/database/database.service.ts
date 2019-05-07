import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { FilesManagerService } from './files-manager.service';
import { IFormula, ISpecialty, ICreator } from 'src/app/models/database.model';
import { ErrorHandlerService } from '../error-handler.service';
import { first } from 'rxjs/operators';
import { tableNames } from 'src/app/constants/tables.constant';
@Injectable({ providedIn: 'root' })
export class DatabaseService extends Dexie {
  formulas: Dexie.Table<IFormula, number>;
  specialties: Dexie.Table<ISpecialty, number>;
  creators: Dexie.Table<ICreator, number>;

  constructor(
    private fmService: FilesManagerService,
    private errorHandler: ErrorHandlerService
  ) {
    super('MedicalCalculator');
  }
  load() {
    // understanding the purpose of indexing fields.
    // A rule of thumb: Are you going to put your property in a where(‘…’) clause? If yes, index it, if not, dont.
    return new Promise(resolve => {
      this.version(1).stores({
        formulas: '++id, name, desc, creatorId, *specialtyIds',
        specialties: '++id, name',
        creators: '++id, name, desc'
      });
      this._fetchTables();
      resolve(this);
    });
  }
  private _fetchTables() {
    // TODO: Add loading
    this.fmService.hashes$.pipe(first()).subscribe(serverHashes => {
      serverHashes.forEach(hash => this._fetchTable(hash));
    });
  }

  private _fetchTable(serverTable: Hash) {
    const { Name: tableName, Hash: serverHash } = serverTable;
    if (this._isTableChanged(serverHash, tableName)) {
      this._saveHash(serverHash, tableName);
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

  /**
   * Compare local hash with server hash with each other.
   * @param serverHash The hash which came from the server
   * @param tableName Table name. for getting hash stored in localStorage.
   */
  private _isTableChanged(serverHash: string, tableName: string) {
    return serverHash !== this._getHash(tableName);
  }

  private _saveHash(serverHash: string, tableName: string) {
    localStorage.setItem(`${tableName}-hash`, serverHash);
  }

  private _getHash(tableName: string) {
    return localStorage.getItem(`${tableName}-hash`);
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
