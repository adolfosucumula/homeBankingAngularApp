import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/AccountModel';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  //standalone: true,
  //imports: [MatTableModule]
})
export class AccountsComponent implements OnInit{

  constructor(){ }

  accountData!: AccountModel[];

  ngOnInit(): void {

  }
}
