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
@Injectable({ providedIn: 'root' })
export class AppDatabaseInitService extends Dexie {
  tableNames = {
    CREATORS: 'creators',
    FORMULAS: 'formulas',
    SPECIALTIES: 'specialties',
    FORMULASPECIALTY: 'formulaSpecialty'
  };
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
        formulaSpecialty: '++id, specialtyId, formulaId',
        creators: '++id, name, desc'
      });
      this._fetchTables();
      resolve(this);
    });
  }
  private _fetchTables() {
    // TODO: Add loading
    this._fetchCreators();
    this._fetchFormulas();
    this._fetchSpecialties();
    this._fetchFormulaSpecialty();
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
  private _fetchSpecialties() {
    this.fmService.getSpecialtiesHash().subscribe(
      specialtiesHash => {
        if (this._isFileChanged(specialtiesHash, this.tableNames.SPECIALTIES)) {
          this._updateTableHash(specialtiesHash, this.tableNames.SPECIALTIES);
          this.fmService.getSpecialties().subscribe(
            specialtiesDto => {
              this._putData(specialtiesDto, this.tableNames.CREATORS);
            },
            error => this.errorHandler.handleServerError(error)
          );
        }
      },
      error => this.errorHandler.handleServerError(error)
    );
  }
  private _fetchFormulaSpecialty() {
    this.fmService.getFormulaSpecialtyHash().subscribe(
      formulaSpecialtyHash => {
        if (
          this._isFileChanged(
            formulaSpecialtyHash,
            this.tableNames.FORMULASPECIALTY
          )
        ) {
          this._updateTableHash(
            formulaSpecialtyHash,
            this.tableNames.FORMULASPECIALTY
          );
          this.fmService.getFormulaSpecialty().subscribe(
            formulaSpecialtyDto => {
              this._putData(
                formulaSpecialtyDto,
                this.tableNames.FORMULASPECIALTY
              );
            },
            error => this.errorHandler.handleServerError(error)
          );
        }
      },
      error => this.errorHandler.handleServerError(error)
    );
  }

  /**
   * Compare local hash with server hash with each other.
   * @param serverHash The hash which came from the server
   * @param tableName Table name. for getting hash stored in local Storage.
   */
  private _isFileChanged(serverHash: string, tableName: string) {
    return serverHash !== this.lsService.getHash(tableName);
  }

  /**
   * Update stored hash with server hash. (if file is changed)
   * @param serverHash The hash which came from the server
   * @param tableName Table name. for getting hash stored in local Storage.
   */
  private _updateTableHash(serverHash: string, tableName: string) {
    this.lsService.saveHash(serverHash, tableName);
  }

  /**
   * Put data in related table in indexedDB
   * @param array Array-like json
   * @param tableName Table name to store
   */
  private _putData(array, tableName: string) {
    array.forEach((item: any) => {
      this.table(tableName).put(item);
    });
  }
}
