import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyService} from "../../services/spotify.service";
import {Observable} from "rxjs";

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

 async getHome(){
    await this.spotifyService.getNewtoken()
    this.spotifyService.getNewReleases()
      .subscribe(data =>
      {
        this.nuevasCanciones = data;
        this.loading=false;}
        , async (errorServicio) =>
        {
          this.error = true;
          this.loading = false;
          await this.errorPersonalizado(errorServicio.error.error.status)
        });
  }

  errorPersonalizado(status:number)
  {
    switch (status) {
      case 400:
        this.mensajeError = "Error en la llamada http";
        break;
      case 403:
        this.mensajeError = "Acceso prohibido";
        break;
      case 404:
        this.mensajeError = "Respuesta no encontrada";
        break;
      case 500:
        this.mensajeError = "Condicion inesperada";
        break;
      case 503:
        this.mensajeError = "Servidor caido, intente mas tarde";
        break;
      default:
        this.mensajeError = "Error no clasificado, contactenos en: ejemplo@gmail.com";
        break;
    }
  }

  ngOnInit(): void {
  }

}
