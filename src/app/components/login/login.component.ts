import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  showErrorMessage = false;
  constructor(private fb:FormBuilder, 
               private authService: AuthService, 
               private router: Router) {

      this.form = this.fb.group({
          user: ['',Validators.required],
          password: ['',Validators.required]
      });
  }

  login() {
      let val = this.form.value;
      console.log(this.form.value)
      if (val.user && val.password) {
        console.log('here')
          this.authService.login(val.user, val.password)
              .subscribe(
                  (data) => {
                      console.log(data.accessToken)
                      localStorage.setItem("id_token",data.accessToken)
                      
                      console.log("User is logged in");
                      this.router.navigateByUrl('');
                  },() =>{
                    console.log('sign in failed')
                    this.showErrorMessage = true;
                  }
              );
      }else{
        console.log('invalid user pass')
      }
  }
  ngOnInit(): void {
    
  }
}
