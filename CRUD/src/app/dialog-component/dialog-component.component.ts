import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponent {

  constructor(public dialogRef:
     MatDialogRef<DialogComponent>
     ,@Inject(MAT_DIALOG_DATA) public data: any) {}

}
