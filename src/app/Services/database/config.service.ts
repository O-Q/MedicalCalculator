import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  BASE_ADDRESS = 'http://localhost:8443/api';
  constructor(private _http: HttpClient) {}
  getDefaultHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }
  getHash(filename: string) {
    return `${this.BASE_ADDRESS}/hash/${filename}`;
  }
  getFile(filename: string) {
    return `${this.BASE_ADDRESS}/static/${filename}.json`;
  }
}

interface Config {
  BaseAddress: string;
  debugging: boolean;
}
