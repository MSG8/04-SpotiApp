import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: ['.card{' +
  '  flex: 0 1 auto !important;' +
  '  width: 200px;' +
  '}' +
  '.badge{' +
  '  margin: 0 !important;' +
  '}']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
