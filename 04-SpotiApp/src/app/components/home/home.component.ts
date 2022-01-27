import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SpotifyService} from "../../services/spotify.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading=true;
  nuevasCanciones:any[] = [];
  constructor(private http: HttpClient,private spotifyService: SpotifyService)
  {
    spotifyService.getNewReleases().subscribe(data => {
      this.nuevasCanciones = data;
      this.loading=false;
    });

  }

  ngOnInit(): void {
  }

}
