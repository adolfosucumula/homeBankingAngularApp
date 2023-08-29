import { Component, Input, OnInit } from '@angular/core';
import { AccountClass } from '../models/AccountModel';
import { MatDialog } from '@angular/material/dialog';
import { AccountServicesService } from '../services/account/account-services.service';
import { Utils } from '../utils/Utils';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  //selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],

})
export class AccountsComponent implements OnInit{

  accountData!: AccountClass[];

  formSearch = new FormGroup({
    search: new FormControl('')
  })
   //Get shared data from parent component
   @Input() message?: string;

   //Creating a list/array list instance of the accounts to store all accounts comes from the server
   allAccounts!: AccountClass[];
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

     /**
     * Function to catch the event typing from currency field to check the values being typing by user
     * are valid or not.
     * First is removed the all non digit from field, next remove the leading zeros meaning the values might make sense,
     * at the end its neccessary to stop/disable function to emit any event, otherwise its gonna be on the infinity loop.
     * */
    this.formSearch.valueChanges.subscribe( form => {
      if(form.search){
        this.search()
      }
    });


   }

   dataSource: any;

   //Method that returns all accounts from database server
   getAll(){
     this.accountServices.getAll().subscribe((data: any) => {
       this.allAccounts = data;
       this.dataSource = new MatTableDataSource(this.allAccounts);
     });
   }

   search(){
    let filter = this.formSearch.value.search || ''
    this.accountData = []
    this.accountData = this.allAccounts.concat(this.accountServices.filter(filter, this.allAccounts))
    if(this.accountData.length > 0){
      this.dataSource = []
      this.dataSource = new MatTableDataSource(this.accountData);
    }

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

}
