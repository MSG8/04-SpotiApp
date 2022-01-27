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

  token: string = "BQA_v2ilFuwC71IDlHT68sgrPpdZXZOksih0Fjgz_cVoRO_oJbtXgGMBkAiICUs9KbQlox213dahOEbua74";

  getNewReleases()
  {
   const headers = new HttpHeaders({
    'Authorization':'Bearer ' +this.token
  });
   return this.http.get("https://api.spotify.com/v1/browse/new-releases",{headers}).pipe(map((data:any) => data.albums.items))
  }

  getArtist(busqueda:string){
    const headers = new HttpHeaders({
      'Authorization':'Bearer ' +this.token
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${busqueda}&type=artist&limit=15`,{headers}).pipe(map((data:any)=>data.artists.items))
  }
}
