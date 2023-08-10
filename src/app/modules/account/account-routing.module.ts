import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAccountComponent } from 'src/app/accounts/home-account/home-account.component';
import { AddAccountComponent } from 'src/app/accounts/add-account/add-account.component';
import { UpdateAccountComponent } from 'src/app/accounts/update-account/update-account.component';
import { EditAccountComponent } from 'src/app/accounts/edit-account/edit-account.component';



const routes: Routes = [
  {path: 'account/home', component: HomeAccountComponent },
  {path: 'account/add', component: AddAccountComponent },
  {path: 'account/edit/:id', component: EditAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
