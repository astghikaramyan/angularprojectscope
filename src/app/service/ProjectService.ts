import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './MessageService';
import {Project} from '../model/Project';
import {ProjectInfo} from '../model/ProjectInfo';

@Injectable({providedIn: 'root'})
export class ProjectService {
  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private httpUrl = 'http://localhost:8085/api/project';

  addProject(project: Project, usersIds: string, date: string, deadline: string, leaderId: number): Observable<Project> {
    return this.http.post<Project>(`${this.httpUrl}/${usersIds}?date=${date}&deadline=${deadline}&leaderId=${leaderId}`, project).pipe(
      tap(_ => this.log(`adding a new user with name ${project.projectName}`)),
      catchError(this.handleError<Project>('add a product'))
    );
  }

  getUsersAllProjects(userId: number): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${this.httpUrl}/${userId}`).pipe(
      tap(_ => this.log('fetching user projects')),
      catchError(this.handleError<ProjectInfo[]>('fetching projects'))
    );
  }

  deleteProject(projectId: number, leaderId: number): Observable<any> {
    return this.http.delete(`${this.httpUrl}/${projectId}/type?leaderId=${leaderId}`).pipe(
      tap(_ => this.log(`deleted projecet with id ${projectId}`)),
      catchError(this.handleError<Observable<any>>(`delete project with id ${projectId}`))
    );
  }

  deleteManyProjects(projectIds: string, leaderId: number): Observable<any> {
    return this.http.delete(`${this.httpUrl}/${projectIds}?leaderId=${leaderId}`).pipe(
      tap(_ => this.log(`deleted projecet with id ${projectIds}`)),
      catchError(this.handleError<Observable<any>>(`delete project with id ${projectIds}`))
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
