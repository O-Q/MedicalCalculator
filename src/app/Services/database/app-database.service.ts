import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppDatabaseService {
  constructor(private lsService: LocalStorageService) {
    // TODO: if it's specialty formula, add it to favSpec
  }
}
