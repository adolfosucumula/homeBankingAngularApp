import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CreditServicesService } from "../services/transactions/credit-services.service";
import { AccountServicesService } from "../services/account/account-services.service";
import { AccountTransactionModel } from "../models/AccountTransactionModel";
import { creditsStorage } from "../utils/local-storage/creditsStorage";


@Injectable({
  providedIn: 'root'
})

export class GetCreditFactory {

  constructor(private accountService: AccountServicesService, private creditServices: CreditServicesService,
    private creditsStorage: creditsStorage
    ){}

  private credits: any;

  selectCredits() {
    this.creditServices.getAll().subscribe({
      next: data => {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          this.credits[index] = element;

        }
        this.creditsStorage.setCredits(data);
        //console.log(JSON.stringify(this.credits))
      },
      error: err => {
        console.log(JSON.stringify(err));
      }
    })
  };

  getCredits(): any{
    this.credits = this.creditsStorage.geCredits();
    console.log(" stored ======== ")
    //console.log(JSON.stringify(this.credits))
    return this.credits;
  }

}
