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

//
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NgFor, AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

//Importing Http client module because we have components that make http requests throught HttpClient module
import { HttpClientModule } from '@angular/common/http';

import { HomeAccountComponent } from './accounts/home-account/home-account.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import { AddAccountComponent } from './accounts/add-account/add-account.component';
import { UpdateAccountComponent } from './accounts/update-account/update-account.component';
import { DebitComponent } from './accounts/debit/debit.component';
import { CreditComponent } from './accounts/credit/credit.component';
import { Page404Component } from './errorPages/page404/page404.component';
import { Page500Component } from './errorPages/page500/page500.component';
import { Page403Component } from './errorPages/page403/page403.component';
import { RouterGuardsComponent } from './guards/router-guards/router-guards.component';



@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
    SignupComponent,
    //AccountsComponent,
    TransactionComponent,
    //DashboardComponent,
    EditAccountComponent,
    AddAccountComponent,
    UpdateAccountComponent,
    Page404Component,
    Page500Component,
    Page403Component,
    RouterGuardsComponent,
    //HomeAccountComponent,
   // DebitComponent,
    CreditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
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
    NgIf,
    NgFor,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule,
    MatNativeDateModule,
    MatDatepickerModule,
    AsyncPipe,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
