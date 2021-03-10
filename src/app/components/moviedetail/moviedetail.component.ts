import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MoviedetailService } from 'src/app/services/moviedetail.service';
import { MoviesService } from 'src/app/services/movies.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCommentModalComponent} from '../add-comment-modal/add-comment-modal.component'
import { EditCommentModalComponent} from '../edit-comment-modal/edit-comment-modal.component'

@Component({
  selector: 'app-moviedetail',
  templateUrl: './moviedetail.component.html',
  styleUrls: ['./moviedetail.component.css']
})
export class MoviedetailComponent implements OnInit {
  movieId: number=0;
  movie: any={};
  cast: string[]=[];
  comments: any[]=[];
  values: any[]=[];
  rating: number=0;
  user: any={};
  constructor( private route: ActivatedRoute, private MoviedetailService:MoviedetailService,private movieService: MoviesService, private modalService: NgbModal) { }


  canDelete(comment){
    if ((comment.username == this.user.user) || (this.user.role == 'admin')){
      return true
    } else{
      return false
    }
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

  showAddReview(){
    let flag = true;
    for (let a of this.comments){
      if (a.username === this.user.user){
        return false;
      }else{
        flag = true;
      }
    }
    if (this.user.role === "admin"){
      flag = false;
    }
    return flag;
  }

  openAddCommentModal(comments, user, movie){
    const modalRef = this.modalService.open(AddCommentModalComponent);
    modalRef.componentInstance.comment = comments;
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.movie = movie;
  
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  openEditCommentModal(comment){
    const modalRef = this.modalService.open(EditCommentModalComponent);
    modalRef.componentInstance.comment = comment
  
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  
  deleteComment(id){
    this.MoviedetailService.deleteComment(id).subscribe(data => console.log(data))
    window.location.reload();
  }

  like(comment){
    let body = {
      comment: comment.id,
      user: this.user.id,
      value: 1
    }
    this.MoviedetailService.postLike(body).subscribe(data => {
      console.log(data)
      window.location.reload()
    })
  }

  dislike(comment){
    let body = {
      comment: comment.id,
      user: this.user.id,
      value: -1
    }
    this.MoviedetailService.postLike(body).subscribe(data => {
      console.log(data)
      window.location.reload()
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.movieId = +params['id']
    })
    this.MoviedetailService.getMovie(this.movieId).subscribe((data)=>{
      this.movie=data
      this.cast=data.cast.split(',')
    })
    this.MoviedetailService.getComments(this.movieId).subscribe((data)=>{
      this.comments=data
      if (data !== []){
        data.forEach(c => this.values.push(c.rating))
        this.rating = this.values.reduce((a,b)=>a+b)/this.values.length
      }
      console.log(this.comments)
    }, err => console.log(err))
    this.movieService.getRole().subscribe((data) => {
      console.log(data)
      this.user = data
    })
    
  }

}
