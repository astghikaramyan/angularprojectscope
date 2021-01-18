import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../service/ProjectService';
import {UserService} from '../service/UserService';
import {LogService} from '../service/LogService';
import {Location} from '@angular/common';
import {ProjectForm} from '../model/ProjectForm';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  userName: string;
  surname: string;

  member = false;
  imgUrl: string;
  userId: string;
  projectId: string;
  addingLog = false;
  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService, private logService: LogService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    this.projectId = this.route.snapshot.queryParamMap.get('projectId');

    // this.userId =this.route.snapshot.queryParamMap.get('userId');
    this.userName = localStorage.getItem('userName');
    this.surname = localStorage.getItem('surname');
    if (localStorage.getItem('type') === 'MEMBER'){
      this.member = true;
    }
  }
  addLog(userId: number, projectId: number) {
   this.logService.addLog(userId, projectId).subscribe(data=>{
     if(data !== null && data !== undefined){
       this.addingLog = true;
     }
   });
  }

  goBack(): void {
    this.location.back();
  }
}
