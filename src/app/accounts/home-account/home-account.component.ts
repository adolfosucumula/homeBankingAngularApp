import { Component, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import {NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
//Importing resources for Table component

import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.css'],
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatTableModule, NgFor, RouterModule],
})
export class HomeAccountComponent implements OnInit{

  //Creating a list/array list instance of the accounts to store all accounts comes from the server
  allAccounts: AccountModel[] = [];
  errorMessage?: string;

  //creating an instance of the account services that provide the crud methods and so on.
  constructor( private accountServices: AccountServicesService){ }

  ngOnInit(): void {
    this.getAll();
  }

  //Method that returns from server all accounts
  getAll(){
    this.accountServices.getAll().subscribe({
      next: data => {
        this.allAccounts = data;

      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMessage = JSON.parse(err.error).message;
        } else {

          this.errorMessage = "Error with status: " + err.status;
        }
      }
    });
  }

}
