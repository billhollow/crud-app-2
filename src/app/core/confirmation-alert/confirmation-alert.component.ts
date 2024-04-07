import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-alert',
  templateUrl: './confirmation-alert.component.html',
  styleUrl: './confirmation-alert.component.scss'
})
export class ConfirmationAlertComponent {

  constructor(
    public _matDialog: MatDialogRef<ConfirmationAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public message: string) { }

    closeDialog(): void {
      this._matDialog.close(false);
    }
    confirmDialog(): void {
      this._matDialog.close(true);
    }

}
