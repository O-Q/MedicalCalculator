import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  BASE_ADDRESS = 'https://miakova.ddns.net:8443/api';
  constructor() {}
  getDefaultHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  getHashes() {
    return `${this.BASE_ADDRESS}/hash/files`;
  }
  getFile(filename: string) {
    return `${this.BASE_ADDRESS}/static/${filename}`;
  }
}
