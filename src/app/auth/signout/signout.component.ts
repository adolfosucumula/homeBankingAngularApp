import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesComponent } from 'src/app/services/auth/auth-services/auth-services.component';
import { CurrentDate } from 'src/app/utils/CurrentDate';
import { StorageService } from 'src/app/utils/StorageService.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

    constructor(private router: Router, private localStore: StorageService,
      private authServices: AuthServicesComponent, private currentDate: CurrentDate
      ){}

    okay = true;
    user: any;

    ngOnInit(): void {
      this.signOut();
    }

    /**
     * Sign out method. First post the data to the database server and then check if the
     * user is logged yet. If false don't do nothing if true redirect to the root page
     */
    signOut(){
      this.user = this.localStore.getUser();
      this.authServices.logout(this.user.username, this.currentDate.getDate())
      .subscribe({
        next: data => {
          this.okay = this.localStore.isLoggedIn();

          if(!this.okay){
            //window.location.reload();
            //this.localStore.redirectToLoginPage();
            this.router.navigate(['/']);

          }
        },
        error: err => {

        }
      })


    }



}
