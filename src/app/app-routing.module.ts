import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MoviedetailComponent } from './components/moviedetail/moviedetail.component';
import { NotfoundComponent } from './components/notfound/notfound.component';

const routes: Routes = [
  {path: '', component:DashboardComponent},
  {path: 'login', component:LoginComponent},
  {path: 'movie/:id', component:MoviedetailComponent},
  {path: '*', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
