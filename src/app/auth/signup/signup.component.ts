import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesComponent } from 'src/app/services/auth/auth-services/auth-services.component';
import { AuthUtils } from 'src/app/utils/AuthUtils';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private authUtils: AuthUtils, private snackbarAlert: SnackBarAlertMessage,
    private localStore: StorageService,private formBuilder: FormBuilder,
    private router: Router, private authServices: AuthServicesComponent,
    private currentDate: CurrentDate
   ){}

  submitted = false;
  isLogged = false;
  hide = true;
  erroMessage = "";

  entityForm: FormGroup = this.authUtils.createSignupFormGroup();

  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


    ngOnInit(): void {

      //Function to validate the form fields according to the specific rules
      this.entityForm = this.formBuilder.group({

        fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],
        email: ['', [Validators.required,Validators.email, Validators.maxLength(100)] ],
        password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ],
        //confirmPassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ]
      });

      if(this.localStore.isLoggedIn()){
        this.router.navigate(['/']);
      }
    };

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
       * First list all the user in database to check the user already exist
       * by comparing the username and the email
       */
      this.authServices.allUsers().subscribe({
        next: data => {
          for (let index = 0; index < data.length; index++) {
            const login = data[index].username;
            const email = data[index].email;
            if(login === this.entityForm.value.username){
              this.erroMessage = "This user is already registered!";
            }else if(email === this.entityForm.value.email){
              this.erroMessage = "This email is already registered!";
            }else{
              this.erroMessage = "";
              this.saveUser(this.entityForm);
            }

          }
        },
        error: err => {

        }
      })

    };

    saveUser(formData: FormGroup){
      this.authServices.register(
        this.authUtils.getRegisterFormData(formData).fullname,
        this.authUtils.getRegisterFormData(formData).username,
        this.authUtils.getRegisterFormData(formData).email,
        this.authUtils.getRegisterFormData(formData).password,
        "Normal",
        true,
        this.currentDate.getDate(),
        this.currentDate.getDate()
      )
      .subscribe({
        next: data => {
          this.router.navigate(['/login']);
        },
        error: err => {

        }
      })
    }



}
