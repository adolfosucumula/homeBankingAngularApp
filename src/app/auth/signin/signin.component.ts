import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { AuthUtils } from 'src/app/utils/AuthUtils';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  //entityForm: UserModel[]

  constructor(private authUtils: AuthUtils, private snackbarAlert: SnackBarAlertMessage,
     private localStore: StorageService,private formBuilder: FormBuilder,
     private router: Router
    ){}

  submitted = false;
  isLogged = false;
  entityForm: FormGroup = this.authUtils.createSignupFormGroup();

   //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
   get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


  ngOnInit(): void {

    //Function to validate the form fields according to the specific rules
    this.entityForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],

    });

    if(this.localStore.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.entityForm.invalid){
      return;
    }

    this.snackbarAlert.openSnackBar("Ready to log In","Okay", 10, "bottom", "center");

    this.localStore.saveUser({username:"Admin", role: "root", isActive: 1},1);
    this.isLogged = this.localStore.isLoggedIn();
    if(this.isLogged){
      //window.location.reload();
      this.router.navigate(['/dashboard']);
    }
  };

}
