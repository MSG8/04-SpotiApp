import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import {HttpClientModule} from "@angular/common/http";
import { NoImagePipe } from './pipes/no-image.pipe';
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import {LoadingComponent} from "./components/shared/loading/loading.component";
import { FooterComponent } from './components/shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtistaComponent,
    HomeComponent,
    SearchComponent,
    NavbarComponent,
    NoImagePipe,
    TarjetasComponent,
    LoadingComponent,
    FooterComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
