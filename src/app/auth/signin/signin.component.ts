import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { AuthServicesComponent } from 'src/app/services/auth/auth-services/auth-services.component';
import { AuthUtils } from 'src/app/utils/AuthUtils';
import { CurrentDate } from 'src/app/utils/CurrentDate';
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
     private router: Router, private authServices: AuthServicesComponent,
     private currentDate: CurrentDate
    ){}

  submitted = false;
  isLogged = false;
  hide = true;
  entityForm: FormGroup = this.authUtils.createSigninFormGroup();

   //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
   get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


  ngOnInit(): void {

    //Function to validate the form fields according to the specific rules
    this.entityForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ],
    });

    if(this.localStore.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }

  /**
   * Method to sig in to the system.
   * The
   * @returns
   */
  onSubmit(): void {
    this.submitted = true;

    if(this.entityForm.invalid){
      return;
    }

    /**
     * First I thought to get all the users from the database to findwitch
     * one have the same username as the user trying to login.
     * If true save his data to the local variable, post the form data
     * to the database and make login. But at the end I decided to implement
     * the submit method only
     */
    //this.getAllUsers();

      this.authServices.signIn(
        this.authUtils.getLoginFormData(this.entityForm).username,
        this.authUtils.getLoginFormData(this.entityForm).password,
        this.currentDate.getDate('dd/MM/YYYY hh:mm')
      ).subscribe({
        next: data => {
          this.localStore.saveUser({
            username: data.username,
            role: "Normal",
            createdAt: this.currentDate.getDate('dd/MM/YYYY hh:mm'),
            isActive: true
          },1);
          this.isLogged = this.localStore.isLoggedIn();
          if(this.isLogged){
            this.snackbarAlert.openSnackBar("You are logged in","Okay", 10, "bottom", "center");
            //window.location.reload();
            this.router.navigate(['/dashboard']);
          }
        },
        error: err => {
          this.snackbarAlert.openSnackBar("Login failed!","Okay", 12, "bottom", "center");
          console.log(err)
        }
      })


  };

  getAllUsers(){
    this.authServices.allUsers().subscribe({
      next: data => {
        this.localStore.saveUser({
          username: data.username,
          role: "ROOT",
          createdAt: this.currentDate.getDate('dd/MM/YYYY hh:mm'),
          isActive: true
        },1);
        this.isLogged = this.localStore.isLoggedIn();
        //console.log("Users got: ")
        //console.log(JSON.stringify(data, null, 4))
      },
      error: err => {
        this.snackbarAlert.openSnackBar("Login failed!","Okay", 12, "bottom", "center");
        console.log(err)
      }
    })
  };

}
