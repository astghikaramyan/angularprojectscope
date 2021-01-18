// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Injectable} from '@angular/core';
// import {Observable, throwError} from 'rxjs';
// import {catchError} from 'rxjs/operators';
// import {Router} from '@angular/router';
//
// @Injectable({providedIn: 'root'})
// export class AuthenticationInterceptor implements HttpInterceptor{
//   constructor(private router: Router) {
//   }
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const token = localStorage.getItem('token');
//     // const loggedUser = jsonInfo ? JSON.parse(jsonInfo) :  null;
//     if(token && localStorage.getItem("userEmail")){
//       const cloned = req.clone({
//         headers: req.headers.set('Authorization', "Bearer " + token)
//       });
//       return next.handle(cloned);
//     }else{
//       return next.handle(req).pipe(
//         catchError(error=>{
//           if(error.status == 401 || error.status == 403){
//             alert("access dinied");
//             this.router.navigate(['/login']);
//             return throwError(error);
//           }
//         })
//       );
//     }
//   }
// }
// https://www.devglan.com/spring-security/angular-jwt-authentication
// https://www.devglan.com/spring-boot/spring-boot-angular-8-example
