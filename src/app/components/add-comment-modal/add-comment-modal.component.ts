import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviedetailService } from 'src/app/services/moviedetail.service';

@Component({
  selector: 'app-add-comment-modal',
  templateUrl: './add-comment-modal.component.html',
  styleUrls: ['./add-comment-modal.component.css']
})
export class AddCommentModalComponent implements OnInit {

  @Input()comment: any;
  @Input()user: any = {};
  @Input()movie: any = {};
  commentForm: FormGroup;
  selected = "";
  rate: number = 0;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private movieDetialService:MoviedetailService) {
    this.commentForm = this.formBuilder.group({
      comment: '',
      rating: ''
    });
   }
   getRating(e){
      console.log(e.target.value)
      this.selected = e.target.getAttribute("data-line");
   }

   submitForm() {
      this.movieDetialService.addComment(this.commentForm.value, this.movie.id, this.user.id, this.user.user).subscribe(data => console.log(data), err => console.log(err))
      this.activeModal.close(this.commentForm.value); 
      window.location.reload();
  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  ngOnInit(): void {
    console.log(this.comment)
  }

}
