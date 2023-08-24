import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';
import { SnackBarAlertMessage } from 'src/app/utils/snackBarAlertMessage';
import { SignUpUtilsService } from './utils/utils.service';
import { AuthServicesComponent } from '../auth-services/auth-services.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  constructor(private utils: SignUpUtilsService, private snackbarAlert: SnackBarAlertMessage,
    private localStore: StorageService,private formBuilder: FormBuilder,
    private router: Router, private authServices: AuthServicesComponent,
    private currentDate: CurrentDate
   ){}

  submitted = false;
  isLogged = false;
  hide = true;
  erroMessage = "";

  entityForm: FormGroup = this.utils.createSignupFormGroup();

  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
    get _fC(): {[key: string]: AbstractControl } {
      return this.entityForm.controls;
    };


    ngOnInit(): void {

      //Function to validate the form fields according to the specific rules
      /*this.entityForm = this.formBuilder.group({

        fullname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+'), Validators.maxLength(200)] ],
        username: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(100)] ],
        email: ['', [Validators.required,Validators.email, Validators.maxLength(100)] ],
        telephone: ['', [Validators.required,Validators.pattern('^[0-9]+$'), Validators.minLength(9), Validators.maxLength(9)] ],
        password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ],
        //confirmPassword: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.minLength(8)] ]
      });*/

      this.entityForm = this.utils.validateFieldGroup();

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
            const telephone = Number(data[index].telephone);
            const tel = Number(this.entityForm.value.telephone);
            if(login === this.entityForm.value.username){
              this.erroMessage = "This user is already registered!";
              break;
            }else if(email === this.entityForm.value.email){
              this.erroMessage = "This email is already registered!";
              break;
            }else if(telephone === tel){
              this.erroMessage = "This telephone is already registered!";
              break;
            }else{
              this.erroMessage = "";
              this.saveUser(this.entityForm);

              break;
            }

          }
        },
        error: err => {
          console.log(JSON.stringify(err), null, 3)
        }
      })

    };

    saveUser(formData: FormGroup){
      this.authServices.register(
        this.utils.getRegisterFormData(formData).fullname,
        this.utils.getRegisterFormData(formData).username,
        this.utils.getRegisterFormData(formData).email,
        this.utils.getRegisterFormData(formData).telephone,
        this.utils.getRegisterFormData(formData).password,
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
          console.log(JSON.stringify(err), null, 3)
        }
      })
    }



}
