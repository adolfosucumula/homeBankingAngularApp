import { Component, OnInit } from '@angular/core';
import { StorageService } from '../utils/StorageService.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit{

    totalBalance = '122.200.000,00';
    currency = [
      {currency: "EUR", icon: "euro_symbol", flag: "../../assets/img/ico/euro.ico"},
      {currency: "USD", icon: "monetization_on", flag: "../../assets/img/ico/dollar.ico"},
      {currency: "AOA", icon: "monetization_on", flag: "../../assets/img/ico/aoa.ico"},
  ];

    public isLogged = false;
    username: any;

    constructor(private localStore: StorageService){ }

    ngOnInit(): void {
      this.isLogged = this.localStore.isLoggedIn();
      this.username = this.localStore.getUser();
    }


    open(){
      alert("Open")
    }

}
