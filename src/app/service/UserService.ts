import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {MessageService} from './MessageService';
import {catchError, map, tap} from 'rxjs/operators';
import {User} from '../model/User';
import {ProjectInfo} from '../model/ProjectInfo';
import {UserForm} from '../model/UserForm';

@Injectable({providedIn: 'root'})
export class UserService {
  private httpUrl = 'http://localhost:8085/api/user';

  constructor(private http: HttpClient, private messageService: MessageService) {
  }


  loginUser(email: string, password: string): Observable<any> {
    return this.http.get<any>(`${this.httpUrl}/login?email=${email}&password=${password}`)
      .pipe(
        map(res => {
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('userName', res.userName);
          localStorage.setItem('surname', res.surname);
          localStorage.setItem('userEmail', res.email);
          localStorage.setItem('type', res.type);
          return res;
        }),
        tap(_ => this.log(`authenticating user with email ${email}`)),
        catchError(this.handleError('Authenticating user'))
      );
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.httpUrl}/register`, user)
      .pipe(
        tap(_ => this.log(`registrating user with name ${user.userName}`)),
        catchError(this.handleError<User>('Registrating user'))
      );
  }

  uploadUserImage(userId: number, file:File): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    const formData = new FormData();
    formData.append('uploadFile', file);
    // encodeURIComponent("msg=name|id|")
    // encodeURI("http://localhost:8080/app/handleResponse?msg=name|id|")
    return this.http.post<any>(`${this.httpUrl}/upload/${userId}`, formData, httpOptions)
      .pipe(
        tap(_ => this.log(`registrating user profile image with userId ${userId}`)),
        catchError(this.handleError<any>('Registrating user profile image'))
      );
  }

  getUserImage(imageName: string){
    return this.http.get(`${this.httpUrl}/image?imageName=${imageName}`)
      .pipe(
        tap(_ => this.log(`Fetching users with member type`)),
        catchError(this.handleError('fetching users with member type'))
      );
  }

  getAllByMemberType(): Observable<User[]> {
    return this.http.get<User[]>(`${this.httpUrl}`)
      .pipe(
        tap(_ => this.log(`Fetching users with member type`)),
        catchError(this.handleError<User[]>('fetching users with member type'))
      );
  }

  updateUser(user: User, userId: number, leaderId: number): Observable<User> {
    return this.http.put<User>(`${this.httpUrl}/${userId}/type?leaderId=${leaderId}`, user).pipe(
      tap(_ => this.log(`updating a product with name ${user.userName}`)),
      catchError(this.handleError<User>('updating user'))
    );
  }

  getUserProjectsInfo(userId: number): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${this.httpUrl}/${userId}`)
      .pipe(
        tap(_ => this.log(`Fetching projects information of user`)),
        catchError(this.handleError<ProjectInfo[]>('fetching projects information of user'))
      );
  }

  getProjectsInfoFilteringByDate(userId: number, dateFrom: string, dateTo: string): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${this.httpUrl}/${userId}/filteredByDate?dateFrom=${dateFrom}&dateTo=${dateTo}`)
      .pipe(
        tap(_ => this.log(`Fetching projects information of user filtered By Date`)),
        catchError(this.handleError<ProjectInfo[]>('fetching projects information of user filtered By Date'))
      );
  }

  getProjectsInfoFilteringByName(userId: number, name: string): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${this.httpUrl}/${userId}/filteredByName?name=${name}`)
      .pipe(
        tap(_ => this.log(`Fetching projects information of user filtered By name`)),
        catchError(this.handleError<ProjectInfo[]>('fetching projects information of user filtered By name'))
      );
  }

   logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('surname');
    localStorage.removeItem('userEmail');
  }

  public isLoggedIn() {
    if (localStorage.getItem('userId')) {
      return true;
    }
  }

  isLoggedout() {
    return !this.isLoggedIn();
  }


  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.httpUrl}/_search?id=${id}`).pipe(
      tap(_ => this.log(`feching user with id = ${id}`)),
      catchError(this.handleError<User>('fetching user'))
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

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    this.messageService.addMessage(`UserService: ${message}`);
  }

}
// https://www.javatpoint.com/angular-spring-file-upload-example
