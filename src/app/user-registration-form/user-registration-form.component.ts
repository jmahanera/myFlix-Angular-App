import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  // This is the function responsible for sending the form inputs to the backend
  /**
   * This method will send the form inputs to the backend
   * @param void
   * @returns user object
   * @memberof UserRegistrationFormComponent
   * @see FetchApiDataService.registerUser()
   * @example registerUser()
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Registration successful:', result);
        // Logic for a successful user registration goes here! (To be implemented)
        this.dialogRef.close(); // This will close the modal on success!

        this.snackBar.open('User successfully registered', 'OK', {
          duration: 2000,
        });
      },
      error: (result) => {
        console.error('Registration error:', result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      },
    });
  }
}
