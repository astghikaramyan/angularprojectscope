import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guards/AuthGuard';
import {RegistrationComponent} from './registration/registration.component';
import {AddProjectComponent} from './add-project/add-project.component';
import {MemberHomeComponent} from './member-home/member-home.component';
import {LogComponent} from './log/log.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'home',
    component: HomeComponent,
    data: {requireLogin: true},
    canActivate: [AuthGuard]
    },
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'addProject', component: AddProjectComponent},
  {path: 'memberHome', component: MemberHomeComponent},
  {path: 'log', component: LogComponent}

  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  // providers:[OrderResolver]
})
export class AppRoutingModule{}
