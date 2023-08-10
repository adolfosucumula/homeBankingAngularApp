
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountServicesService } from "../../services/account/account-services.service";


@Injectable({
  providedIn: 'root'
})

export class CreditAccountUtils {

  debitFormGroup (): FormGroup  {
    return new FormGroup({
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
