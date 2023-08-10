
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AccountServicesService } from "../services/account/account-services.service";


@Injectable({
  providedIn: 'root'
})

export class AccountUtils {

  constructor (private accountServices: AccountServicesService) {}

  /**
   *  This method gets the Form Group data comes from a form and pass them
   * to a variables and returns the same variables with the values received
   * @param form is a group of form fields
   * @returns
   */
  getFormData(form: FormGroup){

    let {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currency,
      createdAt,
      isActive} = form.value;

      isActive = isActive === "1" ? true : false;

    return {
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currency,
      createdAt,
      isActive
    };
  };

  getBalance(balance: String){
    console.log(balance);
    return balance;
  }



}
