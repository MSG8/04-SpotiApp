import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  artistas:any[]=[]

  constructor( private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  buscar(busqueda:string){
  this.spotifyService.getArtist(busqueda).subscribe(data =>{
    this.artistas = data.artistas;
    })
  }
}
