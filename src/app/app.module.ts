import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MoviedetailComponent } from './components/moviedetail/moviedetail.component';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FilterPipe } from './pipes/filter.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AddMovieModalComponent } from './components/add-movie-modal/add-movie-modal.component';
import { AddCommentModalComponent } from './components/add-comment-modal/add-comment-modal.component';
import { EditCommentModalComponent } from './components/edit-comment-modal/edit-comment-modal.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    MoviedetailComponent,
    FilterPipe,
    NotfoundComponent,
    AddMovieModalComponent,
    AddCommentModalComponent,
    EditCommentModalComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents:[
    AddMovieModalComponent
  ]
})
export class AppModule { }
