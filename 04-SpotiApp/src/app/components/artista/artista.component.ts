import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.css']
})
export class ArtistaComponent implements OnInit {

  artista:any={};
  topTracks:any[]=[];

  constructor(private activatedRoute: ActivatedRoute,private spotifyService:SpotifyService)
  {
    this.activatedRoute.params.subscribe(parametros =>
    {
      this.getArtista(parametros['id']);
      this.getTopTracks(parametros['id']);
    })
  }

  getArtista(id:string)
  {
    this.spotifyService.getArtistaId(id)
      .subscribe(artista =>
      {
        console.log(artista);
        this.artista=artista;
      });
  }

  getTopTracks(id:string)
  {
    this.spotifyService.getTopTracks(id)
      .subscribe(album =>
      {
        console.log(album);
        this.topTracks=album;
      });
  }

  ngOnInit(): void {
  }

}
