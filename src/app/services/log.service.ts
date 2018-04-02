import { Injectable } from '@angular/core';
import { Log } from '../models/log';

@Injectable()
export class LogService {
  logs: Log[];

  constructor() { 
    this.logs = [
      {id: '1', text: 'Task 1', date: new Date('12/26/2017 12:54:23')},
      {id: '2', text: 'Task 2', date: new Date('12/28/2017 12:54:23')},
      {id: '3', text: 'Task 3', date: new Date('12/30/2017 12:54:23')}
    ]
   }

   getLogs() {
     return this.logs;
   }
}
