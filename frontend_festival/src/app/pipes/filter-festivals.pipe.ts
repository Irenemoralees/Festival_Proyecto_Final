import { Pipe, PipeTransform } from '@angular/core';
import { Festival } from '../interfaces/festival';

@Pipe({
  name: 'filterFestivals',
  standalone: true
})
export class FilterFestivalsPipe implements PipeTransform {

  transform(value: Festival[], filtro: string): Festival[] {
    return value.filter(x=> x.type.toLowerCase().includes(filtro) || x.location.toLocaleLowerCase().includes(filtro))
  }

}