import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchMovies: GetAllMoviesService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  addToFavorites(movie: any): void {
    // Implement the logic to add the movie to favorites
    console.log('Adding to favorites:', movie);
  }

  isFavorite(movieId: string): boolean {
    // Implement the logic to check if the movie is a favorite
    // Return true or false based on your criteria
    return false; // Placeholder, replace it with your actual logic
  }
}
