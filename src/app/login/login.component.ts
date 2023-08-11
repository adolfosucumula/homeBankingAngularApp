import {Component} from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Utils } from '../utils/Utils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf,
    MatIconModule,MatButtonModule,MatTooltipModule],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email, Validators.max(100)]);
  password = new FormControl('', [Validators.required, Validators.min(8), Validators.max(20)]);
  hide = true;

  //Creating properties
  public signInForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private utils: Utils){};

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPassword(){
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.password.hasError('min')) {
      return 'Enter 8 characters as min value';
    }
    return 'You must enter a value';
  }

//Method to get data from form
  ngOnInit(): void{




    this.signInForm = this.formBuilder.group({
      email: [''],
      password: [''],
    })
  }

  //Method to post data to the database. In ou case we are using a JSON Server database
  signIn(){
    this.utils.storageUserData({id: 0, username: "", isLogged: false });

    if(!this.signInForm.value){
      alert("Sign in successfull! ");
    }else{
      this.http.post<any>("http://localhost:3000/logins", this.signInForm.value)
      .subscribe(res =>{
        //alert("Sign in successfull! "+res);
        //Function to clear the form fields
        this.signInForm.reset();
        this.router.navigate(['dashboard']);
      }, err =>{
        alert("Something went wrong!");
      });
    }

  }
}
