import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ProjectInfo} from '../model/ProjectInfo';
import {User} from '../model/User';
import {ProjectService} from '../service/ProjectService';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../service/UserService';
import {Location} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedFiles: FileList;
  projects: ProjectInfo[] = [];
  projectList: ProjectInfo[] = [];
  projectIds = '';

  user: User;
  userName: string;
  surname: string;

  imgUrl: string;
  leader: boolean;
  users: User[];

  userId: string;
  selectedRow: number;
  checkboxes: boolean[];
  deletingProjectIds: string[] = [];
  @ViewChild('focus', {static: false}) input: ElementRef;
  public toggleButton: boolean = true;

  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message: string;
  imageName: any;
  userElShow = false;
  projecElShow = false;
  constructor(private route: ActivatedRoute, private projectService: ProjectService,
              private userService: UserService,
              private location: Location,
              private router: Router) {
  }


  ngOnInit() {
    // tslint:disable-next-line:radix
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    // this.userId =this.route.snapshot.queryParamMap.get('userId');
    this.userName = localStorage.getItem('userName');
    this.surname = localStorage.getItem('surname');
    if (localStorage.getItem('type') === 'LEADER'){
      this.leader = true;
    }else{
      this.location.replaceState('/');
      this.router.navigate(['/memberHome'], {
        queryParams: {
          userId: this.userId,
        }
      });
    }
    // this.userService.getUserImage(this.userId + '_userId.jpg' ).subscribe(data => {
    //   if (data === null){
    //     this.retrievedImage = './assets/blank-profile.png';
    //     this.imgUrl = './assets/blank-profile.png';
    //   }else{
    //     this.retrieveResonse = data;
    //     this.base64Data = this.retrieveResonse.picByte;
    //     this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
    //   }
    // });

    // this.location.replaceState('/');
    // this.router.navigate([`/products?id=${this.catId}`]);
    this.projectService.getUsersAllProjects(+this.userId).subscribe(data => {
        if (data.length !== 0) {
          console.log(data);
          this.projectList = data;
          // this.checkboxes = new Array(this.projects.length);
          // this.checkboxes.fill(false);
        }
      }
    );
  }

  addRow(index): void {
    const currentElement = this.projects[index];
    this.projects.splice(index, 0, currentElement);
    this.checkboxes.splice(index, 0, false);
  }

  enable() {
    this.toggleButton = false;
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.input.nativeElement.focus();
      this.selectedRow = 0;
    }, 0);
  }

  setClickedRow(index) {
    this.selectedRow = index;
  }

  toggleSelection(event, i) {
    this.checkboxes[i] = event.target.checked;
  }

  deleteSelectedProjects(projectIds: string, leaderId: number){
    this.projectService.deleteManyProjects(projectIds, leaderId).subscribe(_ => {});
  }

  delete() {
    const atleastOneSelected = this.checkboxes.some(checkbox => checkbox === true);

    const allSelected = this.checkboxes.every(checkbox => checkbox === true);

    if (!atleastOneSelected) {
      alert('No rows selected.');
      return;
    }

    if (allSelected) {
      alert('At least one row should be present.');
      return;
    }

    for (let i = this.checkboxes.length - 1; i >= 0; i--) {
      // If selected, then delete that row.
      if (this.checkboxes[i]) {
        this.deletingProjectIds.push(this.projects[i].projectId.toString());
        // this.projects.splice(i, 1);
      }
    }

    if (this.deletingProjectIds.length === 1){

      this.deleteProject(+this.deletingProjectIds[0], +this.userId);
      this.deleteProjectElementsFromProjectLIstForView();
    }else{
      // this.addProjectIdsForDeleting();
      this.projectIds = this.deletingProjectIds.toString();
      console.log(this.projectIds);
      // for (let i = 0; i < this.deletingProjectIds.length - 1; i++) {
      //   this.projectIds = this.projectIds.concat(this.deletingProjectIds[i] + ',');
      //   if (this.projectIds !== null && this.projectIds.length > 1){
      //     this.projectIds = this.projectIds.substring(0, this.projectIds.length - 2);
      //     console.log(this.projectIds);
      //     // this.deleteSelectedProjects(this.projectIds, +this.userId);
      //   }
      // }
      // console.log(this.projectIds);
      this.deleteSelectedProjects(this.projectIds, +this.userId);
      this.deleteProjectElementsFromProjectLIstForView();
    }

    // for (let i = this.checkboxes.length - 1; i >= 0; i--) {
    //   if (this.checkboxes[i]) {
    //     this.projects.splice(i, 1);
    //   }
    // }
    this.deletingProjectIds = [];
    this.projectIds = '';
    // Remove entries from checkboxes array.
    this.checkboxes = this.checkboxes.filter(checkbox => checkbox === false);
  }

  getAllUsersOfMemberType(){
    this.userService.getAllByMemberType().subscribe(data => {
      if (data !== undefined || data != null){
        this.users = data;
        this.userElShow = true;
        this.projecElShow = false;
      }
    });
  }
  goBack(): void {
    this.location.back();
  }
  logout() {
    this.userService.logout();
    this.location.replaceState('/');
    this.router.navigate(['/login']);
  }
  deleteProject(projectId: number, leaderId: number) {
    this.projectService.deleteProject(projectId, leaderId).subscribe(_ => {});
  }
  deleteProjectElementsFromProjectLIstForView(){
    for (let i = this.checkboxes.length - 1; i >= 0; i--) {
      if (this.checkboxes[i]) {
        this.projects.splice(i, 1);
      }
    }
  }

  showProjects(userId: number) {
    this.projectService.getUsersAllProjects(userId).subscribe(data => {
      this.projects = data;
    });
  }

  showProjectsOfMembers (userId: number) {
    this.userService.getUserProjectsInfo(userId).subscribe(data => {
      if (data !== undefined || data !== null) {
        this.projects = data;
        this.userElShow = false;
        this.projecElShow = true;
        this.checkboxes = new Array(this.projects.length);
        this.checkboxes.fill(false);
      }
    });
  }
  // addProduct(projectForm: Project){
  //   this.projectService.addProject(projectForm).subscribe(_=>this.showProjects(this.userId));
  // }
  //
  // addToCart(uId: string, product: Product){
  //   this.itemService.addItem(uId, product.id);
  //   // this.itemService.orders[uId] = [new Set(...this.itemService.orders[uId])];
  //   console.log(window.localStorage.getItem(uId));
  // }

}

// https://stackblitz.com/edit/angular-abhkyk?file=src%2Fapp%2Fapp.component.ts


// https://www.javainuse.com/fullstack/imageupload


