import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-alert-dialog-confirmation',
  templateUrl: './alert-dialog-confirmation.component.html',
  styleUrls: ['./alert-dialog-confirmation.component.css']
})
export class AlertDialogConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
