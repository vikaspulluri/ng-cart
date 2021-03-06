import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(public snackbar: MatSnackBar) {}

  open(message: string, action: string = 'OK'): void {
    this.snackbar.open(message, action, {
      duration: 3000,
    });
  }
}
