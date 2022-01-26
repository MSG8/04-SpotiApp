import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient)
  {
    this.getNewReleases();
  }

  getNewReleases():Observable<any>
  {
   const headers = new HttpHeaders({
    'Authorization':'Bearer BQBg0ZQyUlGHXgY0gNv2U7CeATzcnr4-oJ06O-h6zNCA949IePsTv33itgS0tZV9VcDvJD2bXmN6rqL4naI'
  });

   return this.http.get("https://api.spotify.com/v1/browse/new-releases",{headers})

  }

  getArtist(busqueda:string):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization':'Bearer BQBg0ZQyUlGHXgY0gNv2U7CeATzcnr4-oJ06O-h6zNCA949IePsTv33itgS0tZV9VcDvJD2bXmN6rqL4naI'
    });

    return this.http.get(`https://api.spotify.com/v1/search?q=${busqueda}$type=artist&limit=15`,{headers})
  }
}
