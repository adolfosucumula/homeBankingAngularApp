import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountModule } from './modules/account/account.module';
import { TransactionComponent } from './transaction/transaction.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InputTransactionComponent } from './input-transaction/input-transaction.component';
import { OutputTransactionComponent } from './output-transaction/output-transaction.component';

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule } from '@angular/common/http';

import { HomeAccountComponent } from './accounts/home-account/home-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';
import { UpdateAccountComponent } from './accounts/update-account/update-account.component';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    SignupComponent,
    AccountsComponent,
    TransactionComponent,
    DashboardComponent,
    InputTransactionComponent,
    OutputTransactionComponent,
    EditAccountComponent,
    AddAccountComponent,
    UpdateAccountComponent,
    //HomeAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,//Material Module
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    AccountModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
