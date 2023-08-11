
import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AccountServicesService } from "../../services/account/account-services.service";
import { Observable } from "rxjs";
import { CreditServicesService } from "src/app/services/transactions/credit-services.service";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class EditAccountUtils {

  constructor(private accountService: AccountServicesService, private creditServices: CreditServicesService
    , private router: Router) {}


  editFormGroup (): FormGroup  {
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

  };


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
      currentBalance,
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
      currentBalance,
      currency,
      createdAt,
      isActive
    };

  };

  replaceData(form: FormGroup, currentBalance: string, createdAt: string): FormGroup{
    return new FormGroup({
      account: new FormControl(form.value.account),
      iban: new FormControl(form.value.iban),
      swift: new FormControl(form.value.swift),
      owner: new FormControl(form.value.owner),
      ownerDoc: new FormControl(form.value.ownerDoc),
      initialBalance: new FormControl(form.value.initialBalance),
      currentBalance: new FormControl(currentBalance),
      currency: new FormControl(form.value.currency),
      createdAt: new FormControl(createdAt),
      isActive: new FormControl(form.value.isActive),
    });
  };

  updateAccount(id: number, form: FormGroup){

    this.accountService.update(id,
      this.getFormData(form).account,
      this.getFormData(form).iban,
      this.getFormData(form).owner,
      this.getFormData(form).swift,
      this.getFormData(form).ownerDoc,
      this.getFormData(form).initialBalance,
      this.getFormData(form).currentBalance,
      this.getFormData(form).currency,
      this.getFormData(form).createdAt,
      this.getFormData(form).isActive)
    .subscribe({
      next: data => {
        console.log("========= Success to edit account! =============")
        console.log(JSON.stringify(data, null, 2))
        this.router.navigate(['account/home']);
      },
      error: err => {
        console.log("========= Failed to edit account! =============")
        console.log(JSON.stringify(err, null, 2))
        if (err.error) {
          //this.errorMessage = JSON.parse(err.error).message;
        } else {

          //this.errorMessage = "Error with status: " + err.status;
        }
      }
    })

  }

  updateAccountBalance(id: number,
      account: string,
      iban: string,
      swift: string,
      owner: string,
      ownerDoc: string,
      initialBalance: string,
      currentBalance: string,
      currency: string,
      createdAt: string,
      updatedAt: string,
      isActive: boolean
    ){

    this.accountService.updateBalance
    ( id,
      account,
      iban,
      swift,
      owner,
      ownerDoc,
      initialBalance,
      currentBalance,
      currency,
      createdAt,
      updatedAt,
      isActive
      )
      .subscribe({
      next: data => {
        console.log("========= Success to update account! =============")
        console.log(JSON.stringify(data, null, 2))
        this.router.navigate(['account/home']);
      },
      error: err => {
        console.log("========= Failed to update account! =============")
        console.log(JSON.stringify(err, null, 2))
        if (err.error) {
          //this.errorMessage = JSON.parse(err.error).message;
        } else {

          //this.errorMessage = "Error with status: " + err.status;
        }
      }
    })

  }

}
