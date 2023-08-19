import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { AuthServicesComponent } from 'src/app/services/auth/auth-services/auth-services.component';
import { AlertMessageFactories } from 'src/app/utils/AlertMessageFactories';
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
     private currentDate: CurrentDate, private alertD: AlertMessageFactories
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
    this.getAllUsers();


  };

  getAllUsers(){
    this.authServices.allUsers().subscribe((data: UserModel) => {
      const array = JSON.stringify(this.authServices.findUserByUsernameInDBList(data, this.entityForm.value.username));

      if(array == null){
        this.alertD.openErrorAlertDialog("Warning", "This username was not found.", "Ok", '700ms', '1000ms')
      }else{
        const items = JSON.parse(array);
        if(items.password != this.entityForm.value.password){
          this.alertD.openErrorAlertDialog("Warning", "The password is wrong.", "Ok", '700ms', '1000ms')
        }else{
          this.signIn(this.entityForm, items.username, items.email, items.telephone, items.id, items.role );
        }
      }

    })
  };


  signIn(form: FormGroup, username: string, email: string, telephone: number, userID: number, userRole: string ){
    this.authServices.signIn(
      this.authUtils.getLoginFormData(form).username,
      this.authUtils.getLoginFormData(form).password,
      this.currentDate.getDate()
    ).subscribe({
      next: data => {
        this.localStore.saveUser({
          userID: userID,
          username: username,
          email: email,
          telephone: telephone,
          role: userRole,
          createdAt: this.currentDate.getDate(),
          isActive: true
        },1);
        this.isLogged = this.localStore.isLoggedIn();
        if(this.isLogged){
          this.alertD.openSuccessAlertDialog("You are logged in")
          //window.location.reload();
          this.router.navigate(['/dashboard']);
        }
      },
      error: err => {
        this.snackbarAlert.openSnackBar("Login failed!","Okay", 12, "bottom", "center");
        console.log(JSON.stringify(err), null, 3)
      }
    })

  }

}
