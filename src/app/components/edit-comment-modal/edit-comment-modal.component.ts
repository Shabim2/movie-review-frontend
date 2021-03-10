import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MoviedetailService } from 'src/app/services/moviedetail.service';

@Component({
  selector: 'app-edit-comment-modal',
  templateUrl: './edit-comment-modal.component.html',
  styleUrls: ['./edit-comment-modal.component.css']
})
export class EditCommentModalComponent implements OnInit {
  @Input()comment: any;
  commentForm:FormGroup
  selected = ""
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
      this.movieDetialService.editComment(this.commentForm.value,this.comment.id).subscribe(data => console.log(data), err => console.log(err))
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
