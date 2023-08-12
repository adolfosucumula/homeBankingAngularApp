import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUtils } from 'src/app/utils/AuthUtils';
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
    private router: Router
   ){}

 submitted = false;
 isLogged = false;
 entityForm: FormGroup = this.authUtils.createSignupFormGroup();

}
