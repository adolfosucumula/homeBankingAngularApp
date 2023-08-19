import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-animation',
  templateUrl: './dialog-animation.component.html',
  styleUrls: ['./dialog-animation.component.css'],
  //standalone: true,
  //imports: [MatDialogModule, MatButtonModule],
})
export class AlertModalComponent {

  title: string;
  message: string;
  buttonName: string;

  constructor(public dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {
      this.title = data.title;
      this.message = data.message;
      this.buttonName = data.buttonName;
    }

  /**
   *
   */
  onNoClick(): void {
    this.dialogRef.close();
  };



}



/*------------------------------------------------------------------------------------ */



/**
 *
 */

export interface DialogData {
  title: string;
  message: string;
  buttonName: string;
}
