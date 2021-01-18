import {Component, Input, OnInit} from '@angular/core';
import {ProjectForm} from '../model/ProjectForm';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../service/ProjectService';
import {UserService} from '../service/UserService';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  leader = false;
  userId: string;

  addingProject = false;
  @Input() projectForm: ProjectForm;

  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParamMap.get('id');
    if (localStorage.getItem('type') === 'LEADER'){
      this.leader = true;
    }
  }

  addProject(projectForm: ProjectForm) {
    const project = {projectId: null, projectName: projectForm.projectName, date: null, deadline: null};
    this.projectService.addProject(project, projectForm.userIds, projectForm.date, projectForm.deadline, +this.userId).subscribe(data => {
      this.addingProject = true;
    });
  }

  goBack(): void {
    this.location.back();
  }

}
