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

  createSigninFormGroup(): FormGroup {
    return new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      createdAt: new FormControl(this.date.value)
    });
  };



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
