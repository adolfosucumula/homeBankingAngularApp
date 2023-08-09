import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/AccountModel';
import { MatTableModule } from '@angular/material/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css'],
  standalone: true,
  //imports: [MatTableModule]
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
  ]
})
export class AccountsComponent implements OnInit{

  constructor(){ }

  accountData!: AccountModel[];

  ngOnInit(): void {

  }
}
