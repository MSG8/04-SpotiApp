import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading=true;
  nuevasCanciones:any[] = [];

  mensajeError:string='sin error';
  error:boolean=false;

  constructor(private http: HttpClient,private spotifyService: SpotifyService)
  {
    this.getHome();

  }

  getHome(){
    this.spotifyService.getNewtoken()
    this.spotifyService.getNewReleases()
      .subscribe(data =>
      {
        this.nuevasCanciones = data;
        this.loading=false;
      }, (errorServicio) =>
      {
        this.error = true;
        this.loading = false;
        this.mensajeError = errorServicio.error.error.message;
      });
  }

  ngOnInit(): void {
  }

}
