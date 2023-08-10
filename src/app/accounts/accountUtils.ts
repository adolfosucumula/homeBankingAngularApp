
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class AccountUtils {


  /**
   *
   * @param form
   * @returns
   */
  getFormData(form: FormGroup){

    const {account,
      iban,
      swift,
      owner,
      initialBalance,
      currency,
      isActive} = form.value;

    return {account,
      iban,
      swift,
      owner,
      initialBalance,
      currency,
      isActive};
  }

}
