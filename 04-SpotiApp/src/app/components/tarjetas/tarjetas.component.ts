import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: ['.card{' +
  '  flex: 0 1 auto !important;' +
  '  width: 300px;' +
  '}' +
  '.badge{' +
  '  margin: 0 !important;' +
  '}']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];

  constructor(private router:Router) { }

  verArtista(item:any)
  {
    let idArtista:string;
    if(item.type === 'artist')
    {
      idArtista = item.id;
    }
    else
    {
      idArtista = item.artists[0].id;
    }
    this.router.navigate(['/artist', idArtista]);
  }

  ngOnInit(): void {
  }

}
