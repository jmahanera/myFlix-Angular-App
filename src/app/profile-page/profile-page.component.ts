import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
type User = {
  _id?: string;
  username?: string;
  password?: string;
  email?: string;
  favoriteMovies?: [];
  favoriteMovies?: any[];
};

@Component({
@@ -19,6 +19,7 @@ type User = {
})
export class ProfilePageComponent implements OnInit {
  user: User = {};
  favoriteMovies: any[] = [];

  @Input() userData = { username: '', password: '', email: '' };

export class ProfilePageComponent implements OnInit {

  ngOnInit(): void {
    const user = this.getUser();
    this.getFavMovies();
    // this.favoriteMovies = this.getFavMovies() ?? [];

    if (!user._id) {
      this.router.navigate(['welcome']);
      return;
    }

    this.user = user;

    this.userData = {
      username: user.username || '',
      password: '',
@@ -45,8 +49,8 @@ export class ProfilePageComponent implements OnInit {
  }

  getUser(): User {
    // return JSON.parse(localStorage.getItem('user') || '{}');
    return JSON.parse('');
    return JSON.parse(localStorage.getItem('user') || '{}');
    // return JSON.parse('');
  }

  updateUser(): void {
@@ -64,8 +68,26 @@ export class ProfilePageComponent implements OnInit {
    });
  }

  // logoutUser(): void {
  //   localStorage.clear();
  //   console.log('logged out');
  // }
  getFavMovies(): void {
    // let favMovies;

    this.fetchApiData.getAllMovies().subscribe((movies) => {
      this.favoriteMovies = movies.filter((movie: any) => {
        return this.user.favoriteMovies?.includes(movie._id);
      });

      // console.log(`Fav movies: ${JSON.stringify(this.favoriteMovies)}`);
    });

    // return favMovies;
  }
  removeFavoriteMovie(favMovie: string): void {
    this.fetchApiData.deleteFavMovie(favMovie).subscribe((movies) => {
      this.favoriteMovies = this.favoriteMovies.filter((movie: any) => {
        return movie._id !== favMovie;
      });

      // console.log(`Fav movies: ${JSON.stringify(this.favoriteMovies)}`);
    });
  }
}
