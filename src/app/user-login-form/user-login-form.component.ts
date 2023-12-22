import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApi: FetchApiDataService, // Update this line
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * This method will send the form inputs to the backend
   * @param void
   * @returns user object
   * @memberof UserLoginFormComponent
   * @see FetchApiDataService.userLogin()
   * @example loginUser()
   */

  // This is the function responsible for sending the form inputs to the backend
  public loginUser(): void {
    this.fetchApi.userLogin(this.loginData).subscribe(
      (result) => {
        // Successfully login done
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('Login successful!!!', 'OK', { duration: 2000 }); // Update this line
        this.router.navigate(['movies']);
      },
      (response) => {
        this.snackBar.open(response, 'OK', { duration: 2000 });
      }
    );
  }
}
