import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountModel } from 'src/app/models/AccountModel';
import { AccountServicesService } from 'src/app/services/account/account-services.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit{

  accountForm: AccountModel = {
    id: 0,
    account: "00123",
    iban: "",
    swift: "",
    owner: "",
    initialBalance: "",
    currentBalance: "",
    currency: "",
    isActive: true
  };

  errorMessage?: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountServicesService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));

      this.getById(id);

    });
  };

  getById(id: number){
    this.accountService.getById(id).subscribe({
      next: data => {
        this.accountForm = data;

      },
      error: err => {console.log(err)
        if (err.error) {
          this.errorMessage = JSON.parse(err.error).message;
        } else {

          this.errorMessage = "Error with status: " + err.status;
        }
      }
    })
  };

  update(){
    this.accountService.update(this.accountForm)
    .subscribe({
      next: data => {
        this.router.navigate(['account/home']);
      },
      error: err => {
        if (err.error) {
          this.errorMessage = JSON.parse(err.error).message;
        } else {

          this.errorMessage = "Error with status: " + err.status;
        }
      }
    })
  }
}
