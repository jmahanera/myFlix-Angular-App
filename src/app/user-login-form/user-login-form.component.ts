// user-login-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserLoginService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
  providers: [UserLoginService],
})
export class UserLoginFormComponent implements OnInit {
  @Input() loginData = { username: '', password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('user', result.user.username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
        this.snackBar.open('User Login Successful!!!', 'OK', {
          duration: 2000,
        });
        this.router.navigate(['movies']); // Corrected navigation syntax
      },
      (result) => {
        this.snackBar.open('User Login Failed!', 'OK', { duration: 4000 });
      }
    );
  }
}
