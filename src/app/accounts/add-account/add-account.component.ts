import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountServicesService } from 'src/app/services/account/account-services.service';
//import { myValidation } from '../../utils/Validation';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent {

  /**
   * Create an object of instance using the FormGroup
   * class to manage the form fields value, controlling and validate them
   */
  accountForm: FormGroup = new FormGroup({
    account: new FormControl(''),
    iban: new FormControl(''),
    swift: new FormControl(''),
    owner: new FormControl(''),
    initialBalance: new FormControl(''),
    currency: new FormControl(''),
    isActive: new FormControl(false),
  });

  submitted = false;

  //
  constructor(private formBuilder: FormBuilder, private accountServices: AccountServicesService, private router: Router) { }


  ngOnInit(): void {
    //Function to validate the form fields according to the specific rules
    this.accountForm = this.formBuilder.group({
      account: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)] ],
      iban: ['', [Validators.required, Validators.minLength(19), Validators.maxLength(19)]],
      swift: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)] ],
      owner: ['', [Validators.required, Validators.maxLength(200)] ],
      initialBalance: ['', [Validators.required, Validators.minLength(1)] ],
      currency: ['', [Validators.required, Validators.minLength(2)] ],
      isActive: [false, Validators.required],
    })
  };

  //Call AbstractControl class to check if the data from form fields conforms to the rule defined above
  get _fC(): {[key: string]: AbstractControl } {
    return this.accountForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if(this.accountForm.invalid){
      return;
    }

    const { account,
    iban,
    swift,
    owner,
    initialBalance,
    currency,
    isActive} = this.accountForm.value;


    console.log(JSON.stringify(this.accountForm.value, null, 2));

    this.accountServices.create(account,
      iban,
      swift,
      owner,
      initialBalance,
      currency,
      isActive  === 1 ? true: false).subscribe({
      next: res => {
        console.log(res)

        this.router.navigate(['/account/home'])
        this.submitted = false;
        this.accountForm.reset();
      },
      error: err => {
        console.log(err)
        alert("Error: "+err)
      }
    });


  }



}
