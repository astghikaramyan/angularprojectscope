// import {Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {Observable, of} from 'rxjs';
// import {catchError, map, tap} from 'rxjs/operators';
// import {MessageService} from '../service/MessageService';
// import {User} from '../model/User';
//
// @Injectable({providedIn: 'root'})
// export class AuthService{
//   private httpUrl = "http://localhost:8085/api/user";
//
//   constructor(private http: HttpClient, private messageService: MessageService) {}
//
//   attemptAuth(user: User): Observable<any>{
//     const credentials = {userNameOrEmail: user.email, password: user.password};
//     return this.http.post<any>(`${this.httpUrl}/signin`, credentials)
//       .pipe(
//         map(res=>{
//           localStorage.setItem("userId", user.userId);
//           localStorage.setItem("userName", user.userName);
//           localStorage.setItem("surname", user.surname);
//           localStorage.setItem("userEmail", user.email);
//           return res;
//         }),
//         tap(_=>this.log(`authenticating user with name ${user.name}`)),
//         catchError(this.handleError("Authenticating user"))
//       );
//       // .do(res=>this.setSession)
//       // .shareReplay();
//   }
//
//   attemptSignupUser(user: User){
//     return this.http.post(`${this.httpUrl}/signup`, user)
//       .pipe(
//         tap(_=> this.log(`regisrtating user with name ${user.userName}`)),
//         catchError(this.handleError("Registrating user"))
//       );
//   }
//
//   logout(){
//     localStorage.removeItem('userId');
//   }
//   public isLoggedIn(){
//     if(localStorage.getItem("userEmail")){
//       return true;
//     }
//   }
//
//   isLoggedout(){
//     return !this.isLoggedIn();
//   }
//
//
//   private handleError<T> (operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {
//
//       // TODO: send the error to remote logging infrastructure
//       console.error(error); // log to console instead
//
//       // TODO: better job of transforming error for user consumption
//       this.log(`${operation} failed: ${error.message}`);
//
//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }
//
//   /** Log a AuthService message with the MessageService */
//   private log(message: string) {
//     this.messageService.addMessage(`HeroService: ${message}`);
//   }
//
// }
// // https://www.devglan.com/spring-security/angular-jwt-authentication
