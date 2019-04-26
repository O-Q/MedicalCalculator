import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestorage: AngularFireStorage) {}

  getCreatorsURL() {
    return this.firestorage.ref('creator.json').getDownloadURL();
  }
  getCreatorsMetadata() {
    return this.firestorage.ref('creator.json').getMetadata();
  }
  getFormulasURL() {
    return this.firestorage.ref('formulas.json').getDownloadURL();
  }
  getFormulasMetadata() {
    return this.firestorage.ref('formulas.json').getMetadata();
  }
}
