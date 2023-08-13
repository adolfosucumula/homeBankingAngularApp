import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthUtils {

  constructor(private router: Router){}

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  createSignupFormGroup(): FormGroup {
    return new FormGroup({
      fullname: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      telephone: new FormControl(0),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      role: new FormControl(''),
      isActive: new FormControl(''),
      createdAt: new FormControl(this.date.value),
      updatedAt: new FormControl(this.date.value)
    });
  };

  createSigninFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      createdAt: new FormControl(this.date.value)
    });
  };


  getRegisterFormData(form: FormGroup) {
    let {
      fullname,
      username,
      email,
      telephone,
      password,
      role,
      isActive,
      createdAt,
      updatedAt
    } = form.value;

    return {
      fullname,
      username,
      email,
      telephone,
      password,
      role,
      isActive,
      createdAt,
      updatedAt
    };
  }

  getLoginFormData(form: FormGroup) {
    let {
      username,
      password,
      createdAt
    } = form.value;

    return {
      username,
      password,
      createdAt
    };
  }

}
