
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountServicesService } from "../../services/account/account-services.service";


@Injectable({
  providedIn: 'root'
})

export class DebitAccountUtils {

  debitFormGroup (): FormGroup  {
    return new FormGroup({
      sourceAccount: new FormControl(''),
      owner: new FormControl(''),
      account: new FormControl(''),
      balanceBefore: new FormControl(''),
      amount: new FormControl(''),
      balanceAfter: new FormControl(''),
      operator: new FormControl(''),
      status: new FormControl(''),
      createdAt: new FormControl(''),
    });

  }

}
