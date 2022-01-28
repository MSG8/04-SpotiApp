import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ver = false;
  musica:String="assets/audio/campanaSobre.mp3";

  constructor(private spotifyService:SpotifyService)
  {
    spotifyService.changeEmitted$.subscribe(ruta => {
      this.ver = true;
      this.musica= ruta;
    });
  }


  ngOnInit(): void {
  }

}
