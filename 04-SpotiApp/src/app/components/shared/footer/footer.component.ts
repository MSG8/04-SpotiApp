import { Component, OnInit } from '@angular/core';
import {SpotifyService} from "../../../services/spotify.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ver = false;
  track!:any;
  musica!:URL;
  musicaActiva=false;
  audio=new Audio();
  progresoAudio:number=0;
  volumen:number=5;


  constructor(private spotifyService:SpotifyService)
  {
    spotifyService.changeEmitted$.subscribe(track => {
      this.ver = true;
      this.track=track;
      this.musica= track.preview_url;
      this.audio.src= track.preview_url;
      this.audio.autoplay=true;
      this.audio.ontimeupdate=this.cambioTiempo.bind(this);
      this.musicaActiva=true;
    });
  }


  ngOnInit(): void {
  }

  ocultar(){
    this.ver = false;
    this.audio.pause();
    this.musicaActiva=false;
  }
  async cambio(){
    if(this.musicaActiva){
      this.musicaActiva=false;
      this.audio.pause();
    }else{
      this.musicaActiva=true;
      this.audio.play();
    }
  }
  auto(){
    this.audio.loop=!this.audio.loop;
    let botonLoop:any=document.getElementById("botonLoop");
    if(this.audio.loop){
      botonLoop.classList.add("active");
    }else{
      botonLoop.classList.remove("active");
    }
  }
  cambioTiempo(){
    this.progresoAudio=this.audio.currentTime;
    let timerWrapper:any=document.getElementById("barra-musica");
    let timerBar:any=document.getElementById("progreso-barra-musica");
    let barLength = timerWrapper.clientWidth * (this.audio.currentTime/this.audio.duration);
    timerBar.style.width = barLength + 'px';
  }

  cambiarVolumen(volumenString:string){
    let volumen:number = parseInt(volumenString)
    this.audio.volume = volumen*0.01;
  }


}
