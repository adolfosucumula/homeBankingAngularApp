import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

    constructor(private router: Router, private localStore: StorageService){}

    okay = true;

    ngOnInit(): void {
      //this.localStore.saveUser({},0);
      //this.localStore.clearSession();
      //window.location.reload();
      //this.localStore.isLoggedIn();
      //this.localStore.redirectToLoginPage();

      //alert("You are logout")
      this.signOut();
    }

    signOut(){
      this.localStore.clearSession();
      this.localStore.saveUser({},0);
      this.okay = this.localStore.isLoggedIn();

      if(!this.okay){
        //window.location.reload();
        //this.localStore.redirectToLoginPage();
        this.router.navigate(['/']);

      }

    }



}
