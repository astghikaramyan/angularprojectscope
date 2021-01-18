import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../service/UserService';
import {User} from '../model/User';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  @Input() loginForm;
  id: string;
  loginError = false;

  constructor(private  userService: UserService, private router: Router, private location: Location) {
  }

  requireLogin = false;

  ngOnInit() {

    // window.localStorage.removeItem('token');
    // this.loginForm='';

  }

  onSubmit(loginForm: User) {
    this.userService.loginUser(loginForm.email, loginForm.password).subscribe(data => {
      if (data != null) {
        this.requireLogin = true;
        this.user = data;
        console.log(data);
        localStorage.setItem('userName', data.userName);
        localStorage.setItem('surname', data.surname);
        // localStorage.setItem('userEmail', data.email);
        localStorage.setItem('type', data.type);
        // localStorage.setItem('profileImage', data.profileImage);
        this.location.replaceState('/');
        this.router.navigate(['/home'], {
          queryParams: {
            userId: data.userId,
          }
        });
      } else {
        this.loginError = true;
      }
    });
  }
    // this.authService.attemptAuth(loginForm).subscribe(data=> {
    //   this.user = data;
    //   if(data.status == 200){
    //     window.localStorage.setItem("token", data.result.token);
    //     this.location.replaceState('/');
    //     this.router.navigate(['/home']);
    //   }else{
    //     this.loginError = true;
    //     console.log(data.message);
    //   }
    // });


    public logout() {
      this.requireLogin = false;
      this.userService.logout();
    }

  public isLoggedIn() {
      if (this.requireLogin === true){
        return true;
      }
    }
  }


