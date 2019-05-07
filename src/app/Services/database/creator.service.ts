import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { ICreator } from 'src/app/models/database.model';

@Injectable({
  providedIn: 'root'
})
export class CreatorService {
  constructor(private database: DatabaseService) {}

  get(creatorId: number): Promise<ICreator> {
    return this.database.creators.get(creatorId);
  }
}
