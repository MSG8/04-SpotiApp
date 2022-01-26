import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import { SearchComponent } from './components/search/search.component';


export const routes: Routes =
  [
    { path: 'search', component:SearchComponent},
    { path: 'home', component:HomeComponent},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
  ];

@NgModule({
  // imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes, { useHash:true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
