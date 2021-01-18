import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectInfo} from '../model/ProjectInfo';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../service/ProjectService';
import {UserService} from '../service/UserService';
import {Location} from '@angular/common';
import {Log} from '../model/Log';
import {LogService} from '../service/LogService';

@Component({
  selector: 'app-member-home',
  templateUrl: './member-home.component.html',
  styleUrls: ['./member-home.component.css']
})
export class MemberHomeComponent implements OnInit {

  userName: string;
  surname: string;

  member = false;
  imgUrl: string;
  userId: string;
  projectList: ProjectInfo[] = [];
  logs: Log[];
  projecElShow = false;
  logElShow = false;
  emptyLog = false;
  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService, private logService: LogService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    // this.userId =this.route.snapshot.queryParamMap.get('userId');
    this.userName = localStorage.getItem('userName');
    this.surname = localStorage.getItem('surname');
    if (localStorage.getItem('type') === 'MEMBER'){
      this.member = true;
    }
  }
  // goBack(): void {
  //   this.location.back();
  // }
  logout() {
    this.userService.logout();
    this.location.replaceState('/');
    this.router.navigate(['/login']);
  }

  showProjects(userId: number) {
    this.userService.getUserProjectsInfo(userId).subscribe(data => {
      if (data !== undefined || data !== null) {
        this.projectList = data;
        this.logElShow = false;
        this.projecElShow = true;
      }
    });
  }

  getAllLogs(){
    this.logService.getUsersAllLogs(+this.userId).subscribe(data => {
      if (data !== undefined && data != null){
        this.logs = data;
        this.logElShow = true;
        this.projecElShow = false;
        this.emptyLog = false;
      }else {
        this.emptyLog = true;
      }
    });
  }

  startLog(logId: number){
    this.logService.updateLogStartDate(logId).subscribe(data => {
      this.getAllLogs();
    });
  }

  endLog(logId: number){
    this.logService.updateLogEndDate(logId).subscribe(data => {
      this.getAllLogs();
    });
  }
}

