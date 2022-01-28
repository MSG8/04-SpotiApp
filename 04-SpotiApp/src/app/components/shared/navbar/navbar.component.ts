import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  newToken(){
    this.spotifyService.getNewtoken();
    console.log(this.spotifyService.token)
  }
}
