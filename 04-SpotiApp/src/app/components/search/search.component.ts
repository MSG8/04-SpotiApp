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

  constructor( private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(busqueda:string){
    this.cambio(busqueda);
    this.spotifyService.getArtist(busqueda).subscribe(data =>{
    this.artistas = data;
    this.cambio(busqueda);
    })
  }
  async cambio(busqueda:string){
    if(busqueda !=''){
      this.loading=!this.loading;
    }
  }
}
