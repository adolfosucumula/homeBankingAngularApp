
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";


@Injectable({
  providedIn: 'root'
})

export class AddAccountUtils {

  getAddFormGroup (): FormGroup  {
    return new FormGroup({
      account: new FormControl(''),
      iban: new FormControl(''),
      swift: new FormControl(''),
      owner: new FormControl(''),
      ownerDoc: new FormControl(''),
      initialBalance: new FormControl(''),
      currency: new FormControl(''),
      createdAt: new FormControl(''),
      isActive: new FormControl(false),
    });

  }

}
