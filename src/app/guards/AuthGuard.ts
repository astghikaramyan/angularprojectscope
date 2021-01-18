import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../service/UserService';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
  constructor(private router: Router, private userService: UserService) {
  }

  canActivate(){
    if (this.userService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
