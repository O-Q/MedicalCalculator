import Dexie from 'dexie';
import { Injectable } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class AppDatabaseInitService extends Dexie {
  tableNames = { CREATORS: 'creators', FORMULAS: 'formulas' };
  formulas: Dexie.Table<IFormula, number>;
  specialties: Dexie.Table<ISpecialty, number>;
  formulaSpecialty: Dexie.Table<IFormulaSpecialty, number>;
  creators: Dexie.Table<ICreator, number>;

  constructor(
    private firebaseService: FirebaseService,
    private httpClient: HttpClient
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
      this.fetchTables();
      resolve(this);
    });
  }

  fetchTables() {
    this._fetchCreators();
    this._fetchFormulas();
  }

  private _fetchCreators() {
    this.firebaseService.getCreatorsMetadata().subscribe(metadata => {
      if (this._isFileChanged(metadata, this.tableNames.CREATORS)) {
        this._updateTableHash(metadata, this.tableNames.CREATORS);
        this.firebaseService.getCreatorsURL().subscribe(url => {
          this.httpClient.get<ICreator[]>(url).subscribe(creatorsDto => {
            this._putData(creatorsDto, this.tableNames.CREATORS);
          });
        });
      }
    });
  }
  private _fetchFormulas() {
    this.firebaseService.getFormulasMetadata().subscribe(metadata => {
      if (this._isFileChanged(metadata, this.tableNames.FORMULAS)) {
        this._updateTableHash(metadata, this.tableNames.FORMULAS);
        this.firebaseService.getFormulasURL().subscribe(url => {
          this.httpClient.get<IFormula[]>(url).subscribe(formulasDto => {
            this._putData(formulasDto, this.tableNames.FORMULAS);
          });
        });
      }
    });
  }
  private _isFileChanged(metadata, tableName: string) {
    return metadata.md5Hash !== localStorage.getItem(`${tableName}-hash`);
  }
  private _updateTableHash(metadata, tableName: string) {
    localStorage.setItem(`${tableName}-hash`, metadata.md5Hash);
  }
  private _putData(array, tableName: string) {
    array.forEach(item => {
      this.table(tableName).put(item);
    });
  }
}

interface IFormula {
  id?: number;
  name: string;
  desc: string;
  form: IForm;
  advice: string;
  management: string;
  criticalActions: string;
  creatorId: number;
  isFav: boolean;
}
interface ISpecialty {
  id?: number;
  name: string;
}
interface IFormulaSpecialty {
  id?: number;
  specialtyId: number;
  formulaId: number;
}

interface ICreator {
  id?: number;
  name: string;
  desc: string;
}

interface IForm {
  inputs: {
    title: string;
    unit: string;
    type: string;
    hint: string;
    tip: string;
  }[];
  selects: {
    title: string;
    unit: string;
    type: string;
    hint: string;
    tip: string;
  }[];
}
