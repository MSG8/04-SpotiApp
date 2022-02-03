import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  loading=false;
  artistas:any[]=[]
  noEncontrado:boolean=false;

  constructor( private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(busqueda: string, tipo: string)
  {
    this.cambio(busqueda);
    if (busqueda!="")
    {
      this.spotifyService.getArtist(busqueda,tipo)
        .subscribe(data =>
        {
          if (data.length==0)
            this.noEncontrado=true;
          else
            this.noEncontrado=false;
          this.artistas = data;
          this.cambio(busqueda)
        })
    }
  }

  async cambio(busqueda:string){
    if(busqueda !=''){
      this.loading=!this.loading;
    }
  }

}
