// user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  providers: [UserLoginService], // Provide the service here
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        console.log(result);
        this.dialogRef.close();
        this.snackBar.open('User Login Successful!!!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        this.snackBar.open('User Login Failed!', 'OK', { duration: 4000 });
      }
    );
  }
}
