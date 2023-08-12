import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/utils/StorageService.service';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  constructor(private route: ActivatedRoute, private router: Router, private utils: Utils,
    private localStore: StorageService){}

    public isVisited = true;
    isLogged = false;

  ngOnInit(): void{

    console.log("From APP COMPO")
    console.log(JSON.stringify(this.localStore.getUser()))
    console.log(JSON.stringify(this.localStore.isLoggedIn()))
    this.isLogged = this.localStore.isLoggedIn();
    console.log("FROM HOme PAGE")
    console.log("Is logged: "+this.isLogged);
  }


  signIn(){
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  signUp(){
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
}
