import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './MessageService';
import {Log} from '../model/Log';
import {ProjectInfo} from '../model/ProjectInfo';

@Injectable({providedIn: 'root'})
export class LogService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private httpUrl = 'http://localhost:8085/api/log';

  addLog(userId: number, projectId: number): Observable<Log> {
    const log = {logId: null, startDateTime: '', endDateTime: '', hours: 0};

    return this.http.post<Log>(`${this.httpUrl}?userId=${userId}&projectId=${projectId}`, log).pipe(
      tap(_ => this.log(`adding a new log with current start start `)),
      catchError(this.handleError<Log>('add a log with current time start'))
    );
  }

  updateLogStartDate(logId: number): Observable<Log> {

    const log = {logId: +logId, startDateTime: '', endDateTime: '', hours: 0};
    return this.http.patch<Log>(`${this.httpUrl}/startLogTime/${logId}`, log).pipe(
      tap(_ => this.log(`updating a log start time with ${logId}`)),
      catchError(this.handleError<Log>('update a log'))
    );
  }

  updateLogEndDate(logId: number): Observable<Log> {
    const log = {logId: +logId, startDateTime: '', endDateTime: '', hours: 0};
    return this.http.patch<Log>(`${this.httpUrl}/endLogTime/${logId}`, log).pipe(
      tap(_ => this.log(`updating a log end with end time ${logId}`)),
      catchError(this.handleError<Log>('update a log'))
    );
  }

  getUsersAllLogs(userId: number): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.httpUrl}/${userId}`).pipe(
      tap(_ => this.log('fetching user logs')),
      catchError(this.handleError<Log[]>('fetching logs'))
    );
  }



  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ProductService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`ProductService: ${message}`);
  }
}
