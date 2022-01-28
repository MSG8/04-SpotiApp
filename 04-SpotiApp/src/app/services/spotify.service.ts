import {EventEmitter, Injectable, Input} from '@angular/core';
import {map, Observable, Subject} from "rxjs";
import {HttpClient, HttpHeaders,} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  token: string = '';
  private musica!: URL;

  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();


  constructor(private http: HttpClient)
  {
    this.getNewtoken()
  }

  async getNewtoken(){
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
      this.token = data.access_token}
    )).toPromise()
}


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

  musicaFooter(audioUrl:URL)
  {
    this.musica=audioUrl;
  }

  emitChange(change: any)
  {
    this.emitChangeSource.next(change);
  }
}
