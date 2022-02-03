import {EventEmitter, Injectable, Input} from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders,} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string = '';

  private emitChangeSource = new Subject<any>();
  changeEmitted$ = this.emitChangeSource.asObservable(); //lo cambiamos a un observable


  constructor(private http: HttpClient)
  {
    this.getNewtoken()
  }

  getCookie(cname:string) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0)==' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length,c.length);
      }
    }
    return "";
  }

  getNewtoken(){


    const BODY = new URLSearchParams();
    BODY.set('grant_type','client_credentials')
    BODY.set('client_id','3db4618e13964db19ef70097d113b732')
    BODY.set('client_secret','cec6a28fdfac44be85aaa8be16614a73')

    const headers = new  HttpHeaders(
      {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    );
    return this.http.post('https://accounts.spotify.com/api/token', BODY,{headers}).pipe(map((data:any) => {
      if (this.getCookie("token")=="")
      {
        let fecha = new Date();
        fecha.setDate(fecha.getDate());
        document.cookie = 'token='+data.access_token+';expires='+fecha;
      }
      else
      {
        console.log(this.getCookie("token"))
      }
    }
    )).toPromise()
}

  // Metodo encargado de llamar a la api con GET y introducir el link deseado
  getQuery(ruta:string):Observable<any>
  {
    const headers = new HttpHeaders(
      {
      'Authorization':'Bearer '+this.getCookie("token")
      });

    const API = "https://api.spotify.com/v1/"

    console.log(API+ruta,{headers})
    return this.http.get(API+ruta,{headers})
  }

  getNewReleases()
  {
   return this.getQuery("browse/new-releases").pipe(map((data:any) => data.albums.items))
  }

  getArtist(busqueda:string,tipo:string)
  {

    return this.getQuery(`search?q=${busqueda}&type=${tipo}`).pipe(map((data:any)=>data[tipo+"s"].items))
  }

  getArtistaId(id:string):Observable<any>
  {
    return this.getQuery(`artists/${id}`)
  }

  getTopTracks(id:string)
  {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(map((data: any) => data.tracks));
  }

  //emite el cambio apara que lo reciba el footer
  emitChange(change: any)
  {
    this.emitChangeSource.next(change);
  }
}
