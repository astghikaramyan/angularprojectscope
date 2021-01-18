import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../model/User';
import {UserForm} from '../model/UserForm';
import {UserService} from '../service/UserService';
import {Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public user: User;
  error = false;
  public successMessage: string;
  file: File;


  constructor(private userServcie: UserService, private router: Router, private formBuilder: FormBuilder) {
  }

  @ViewChild('uploadInput', {
    static: true
  }) uploadInput;

  fileToUpload: File = null;

  imageUrl: string;

  submitted = false;

  registrationForm: any;

  ngOnInit() {
    this.imageUrl = './assets/blank-profile.png';
    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }


  onSelectFile(file) {
    this.fileToUpload = file.target.files[0];
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }

  // onFileSelect(event : FileList) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //
  //     // const  fileReader: FileReader = new FileReader();
  //     // fileReader.onloadend = () => this.file = fileReader.result;
  //     // fileReader.readAsDataURL(file);
  //
  //     //copyfiles -f "./foo/**/*.txt" out
  //
  //     this.registrationForm.get('').setValue(file);
  //
  //   }
  // }

  onSubmit() {
    if (this.registrationForm.invalid) {

      return;
    }
    const formData = new FormData();
    formData.append('id', null);
    formData.append('userName', this.registrationForm.value.userName);
    formData.append('surname', this.registrationForm.value.surname);
    formData.append('email', this.registrationForm.value.email);
    formData.append('password', this.registrationForm.value.password);
    formData.append('type', this.registrationForm.value.type);
    formData.append('profilePicture', this.uploadInput.nativeElement.files[0].name);
    formData.append('uploadImage', this.uploadInput.nativeElement.files[0]);
    // formData.append('uploadImage', this.fileToUpload);

    const user: User = {
      userId: null,
      userName: this.registrationForm.value.userName,
      surname: this.registrationForm.value.surname,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      type: this.registrationForm.value.type,
      profilePicture: this.uploadInput.nativeElement.files[0].name
    };
    this.userServcie.registerUser(user).subscribe(result => {
      if (result !== undefined && result !== null){
        this.userServcie.uploadUserImage(result.userId, this.fileToUpload).
        subscribe(data => {
          this.submitted = true;
          this.successMessage = 'You are successfully registrated';
        });
      }else{
        this.error = true;
      }
    });
  }

}

// https://www.c-sharpcorner.com/article/file-upload-and-download-in-angular-9/

// https://www.npmjs.com/package/file-saver
// https://stackoverflow.com/questions/47936183/angular-file-upload
// https://www.youtube.com/watch?v=OF1UVR2l_eo
// https://www.youtube.com/watch?v=8FpJ9C1uSH0
