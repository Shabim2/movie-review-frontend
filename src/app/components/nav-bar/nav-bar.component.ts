import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  toHome(){
    this.router.navigateByUrl('')
  }
  signOut(){
    localStorage.setItem("id_token",'')
    this.router.navigateByUrl('login')
  }

}
