import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage'
})
export class NoImagePipe implements PipeTransform {

  transform(value: any): any   {
   if (value.length == 0){
     return "assets/img/noimage.png"
   }else{
     return value[1].url;
   }


  }

}
