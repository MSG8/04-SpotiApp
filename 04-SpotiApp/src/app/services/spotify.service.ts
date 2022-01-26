import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  headers:HttpHeaders = new HttpHeaders({
    'Authorization':'Bearer BQAJ10iHS6vEO07zCUMYrc_bJQaYiuCltyVkwAdKAx0RcFqOzuyAaWz6tBPNX8lICqABAW18fs_DId0bsJM'
  });


  constructor(private http: HttpClient)
  {
    this.getNewReleases();
  }

  getNewReleases():Observable<any>
  {
    this.http.get("https://api.spotify.com/v1/browse/new-releases",{headers})
      .subscribe(data => {
        console.log(data);
      });
  }
}
