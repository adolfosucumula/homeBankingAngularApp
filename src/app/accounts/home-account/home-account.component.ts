import { Component, Input, OnInit } from '@angular/core';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
import {NgFor} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

//Importing resources for Table component

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Utils } from 'src/app/utils/Utils';


@Component({
  selector: 'app-home-account',
  templateUrl: './home-account.component.html',
  styleUrls: ['./home-account.component.css'],
  standalone: true,
  imports: [MatCardModule,MatButtonModule, MatButtonToggleModule, MatTableModule, NgFor, RouterModule,
    MatDialogModule,MatDividerModule,
    MatSidenavModule,MatIconModule,MatMenuModule,
  ],
})
export class HomeAccountComponent implements OnInit{

  //Get shared data from parent component
  @Input() message?: string;

  //Creating a list/array list instance of the accounts to store all accounts comes from the server
  allAccounts!: AccountModel[];
  errorMessage?: string;
  calledChildren = false;

  //creating an instance of the account services that provide the crud methods and so on.
  constructor( private accountServices: AccountServicesService, private route: ActivatedRoute, private router: Router,
    public dialog: MatDialog, private utils: Utils
    ){ }

  ngOnInit(): void {

    this.getAll();

    this.route.paramMap.subscribe( ( param ) => {
      var id = Number(param.get('id'));
      //this.removeAccount(id);
    })

  }

  dataSource: any;

  //Method that returns all accounts from database server
  getAll(){
    this.accountServices.getAll().subscribe({
      next: data => {
        this.allAccounts = data;
        this.dataSource = new MatTableDataSource(this.allAccounts);
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

  displayedColumns: string[] = ['id', 'account', 'iban', 'initialBalance', 'amount', 'owner', 'isActive', 'edit'];
  //dataSource = ELEMENT_DATA;

  /**
   * Method to remove account from database server
   * @param id
   */
  removeAccount(id: number): void {
    this.accountServices.delete(id).subscribe({
      next: res => {
        this.getAll();
      },
      error: err => {
        if (err.error) {
          this.errorMessage = JSON.parse(err.error).message;
        } else {

          this.errorMessage = "Error with status: " + err.status;
        }
      }
    })
  };



  accountAdd(){
    this.router.navigate(['account/add'], {relativeTo: this.route});
  }

  accountEdit(id: number){
    this.router.navigate(['account/edit/',id], {relativeTo: this.route});
  }

  accountCredit(id: number){
    this.router.navigate(['account/trans/credit/',id], {relativeTo: this.route});
  }

  accountDebit(id: number){
    this.router.navigate(['account/trans/debit/',id], {relativeTo: this.route});
  }



}
