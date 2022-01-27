import { Injectable } from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient)
  {
    this.getNewReleases();
  }

  token: string = "BQC2cFFoPfWd5hoKnabAioFkekYqFk7Ywdxl3QwuzYGQHQzN0_C-F64w2tWwVSchcLHwkSws1G-xihhMjos";


  getQuery(ruta:string):Observable<any>
  {
    const headers = new HttpHeaders(
      {
      'Authorization':'Bearer ' +this.token
      });

    const API = "https://api.spotify.com/v1/"

    return this.http.get(API+ruta,{headers})
  }

  getNewReleases()
  {
   return this.getQuery("browse/new-releases").pipe(map((data:any) => data.albums.items))
  }

  getArtist(busqueda:string){

    return this.getQuery(`search?q=${busqueda}&type=artist&limit=15`).pipe(map((data:any)=>data.artists.items))

  }

  getArtistaId(id:string):Observable<any>
  {
    return this.getQuery(`artists/${id}`)
  }


  getTopTracks(id:string)
  {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map((data: any) => data.tracks));
  }

}
