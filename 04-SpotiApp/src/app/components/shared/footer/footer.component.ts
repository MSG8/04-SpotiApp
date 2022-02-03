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
  ultimoVolumen:number=0;


  constructor(private spotifyService:SpotifyService)
  {
    //Cuando recibe el cambio hace el observable y con su respuesta colocamos el audio
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


  ngOnInit(): void
  {

  }

  //metodo encargado de ocultar el footer y colocar sus atributos por defecto
  ocultar()
  {
    this.ver = false;
    this.audio.pause();
    this.audio.volume=this.ultimoVolumen;
    this.musicaActiva=false;
  }
  //cambiamos el boton de play por el de pause visual y funcionalmente
  async cambioPlay()
  {
    if(this.musicaActiva)
    {
      this.musicaActiva=false;
      this.audio.pause();
    }else
    {
      this.musicaActiva=true;
      this.audio.play();
    }
  }
  // colocas visual y funcionamente la musica en bucle
  auto(){
    this.audio.loop=!this.audio.loop;
    let botonLoop:any=document.getElementById("botonLoop");
    if(this.audio.loop){
      botonLoop.classList.add("active");
    }else{
      botonLoop.classList.remove("active");
    }
  }

  //diversos cambio que surge al ir reproduciendose la musica
  cambioTiempo(){
    //Progreso en segundos del audio
    this.progresoAudio=this.audio.currentTime;

    //Barra de progreso del audio
    let timerBar:any=document.getElementById("rangoVolumenDos"); //barra progreso de la  musica, exige que sea un id de html y no de angular ya que entonces no se reconoceria
    timerBar.value = (this.audio.currentTime).toFixed(); // cambias el valor del input segun el tiempo

    //Si la musica acaba y no es loop cambiara el boton play/pause
    if (this.audio.currentTime==this.audio.duration)
      if (this.musicaActiva)
        this.musicaActiva=false;
  }

  //funcion encargada de cambiar la barra de reproduccion
  cambiarMusica()
  {
    let timerBar:any=document.getElementById("rangoVolumenDos"); //barra progreso de la  musica
    let colocarReproduccion:number = parseFloat(timerBar.value);
    this.audio.currentTime = colocarReproduccion;
    this.progresoAudio = colocarReproduccion;
  }

  //Toma el valor de un input de rango para aplicar el volumen
  //Use el evento oninput para cambiarse al cambiar el input (cuando varie el rango)
  cambiarVolumen(volumenString:string,volumenIcono: HTMLElement)
  {
    if (this.audio.volume == 0)
    {
      volumenIcono.classList.add("active");
    }
    let volumen:number = parseInt(volumenString);
    this.audio.volume = volumen*0.01;
    this.ultimoVolumen=this.audio.volume;
  }

  //Toma el elemento del icono de volumen y cambia el color de este si esta muteado o no
  mutear(volumenIcono: HTMLElement)
  {
    if (this.audio.volume != 0)
    {
      this.audio.volume = 0;
      volumenIcono.classList.remove("active");
    }
    else
    {
      this.audio.volume = this.ultimoVolumen;
      volumenIcono.classList.add("active");
    }
  }

}
