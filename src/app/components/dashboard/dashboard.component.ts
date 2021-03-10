import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from 'src/app/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddMovieModalComponent} from '../add-movie-modal/add-movie-modal.component'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  movies: any;
  searchQuery: string = '';
  rating: number = 0;
  user: any={};
  constructor(private router: Router, private movieService: MoviesService, private modalService: NgbModal) { }

  getItems(){
    this.movieService.getItems().subscribe(data =>{
      this.movies = data;
    })
  }

  showRating(rating){
    let res = ''
      if (rating > 0 && rating <= 1) {
        res = "Terrible";
      } else if (rating > 1 && rating <= 2){
        res = "Bad";
      } else if(rating > 2 && rating <= 3){
        res = "Okay";
      } else if (rating > 3 && rating <= 4){
        res = "Good";
      } else if(rating > 4 && rating <= 5){
        res = "Great";
      }
    return res
  }
  deleteMovie(id){
    this.movieService.deleteItem(id).subscribe(data => console.log(data));
    window.location.reload();
  }

  openAddMovieModal(movie){
  const modalRef = this.modalService.open(AddMovieModalComponent);
  modalRef.componentInstance.movie = movie;

  modalRef.result.then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
  }

  getRating(ratings: number[]): number{
     return ratings.reduce((a, b) => a + b) / ratings.length;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('id_token')){
      this.router.navigateByUrl('login')
    }
    this.getItems();
    this.movieService.getRole().subscribe(data => this.user = data)
  }

}
