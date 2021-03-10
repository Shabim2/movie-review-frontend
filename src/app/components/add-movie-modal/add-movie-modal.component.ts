import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-add-movie-modal',
  templateUrl: './add-movie-modal.component.html',
  styleUrls: ['./add-movie-modal.component.css']
})
export class AddMovieModalComponent implements OnInit {

  @Input()movie: any = {};
  myForm: FormGroup;
  

  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private movieService: MoviesService) { 
    this.myForm = this.formBuilder.group({
      title: '',
      genre: '',
      plot: '',
      cast: '',
      image: '',
      releaseDate: ''
    });
  }

  submitForm() {
    if (this.movie.id === undefined){
      this.movieService.addItem(this.myForm.value).subscribe(data => console.log(data))
      this.activeModal.close(this.myForm.value);
      window.location.reload()
    } else{
      this.movieService.editItem(this.movie.id,this.myForm.value).subscribe(data => console.log(data))
      this.activeModal.close(this.myForm.value);
      window.location.reload()
    }
    
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit(): void {
    console.log(this.movie)
  }

}
