import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Log } from '../models/log';

@Injectable()
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});

  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean> (true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // Test Logs
    // this.logs = [
    //   {id: '1', text: 'Task 1', date: new Date('12/26/2017 12:54:23')},
    //   {id: '2', text: 'Task 2', date: new Date('12/28/2017 12:54:23')},
    //   {id: '3', text: 'Task 3', date: new Date('12/30/2017 12:54:23')}
    // ]

    this.logs = [];
   }

   getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }

     return of(this.logs.sort((a, b) => {
       return b.date = a.date;
     }));
   }

   setFormLog(log: Log) {
     this.logSource.next(log);
   }

   addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   updateLog(log: Log) {
     this.logs.forEach((cur, index) => {
      if(log.id === cur.id) {
        this.logs.splice(index, 1);
      }
     });
     this.logs.unshift(log);

     // Update local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   deleteLog(log: Log) {
    this.logs.forEach((cur, index) => {
     if(log.id === cur.id) {
       this.logs.splice(index, 1);
     }
    });

    // Delete added to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

    clearState() {
      this.stateSource.next(true);
    }
}
