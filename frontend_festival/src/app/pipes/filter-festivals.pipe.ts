import { Pipe, PipeTransform } from '@angular/core';
import { Festival } from '../interfaces/festival';

@Pipe({
  name: 'filterFestivals',
  standalone: true
})
export class FilterFestivalsPipe implements PipeTransform {

  transform(value: Festival[], filtro: string): Festival[] {
    if (!filtro) {
      return value;
    }
    const filtroLower = filtro.toLowerCase();
    return value.filter(festival =>
      festival.type.toLowerCase().includes(filtroLower) ||
      festival.location.toLowerCase().includes(filtroLower) ||
      festival.festivalName.toLowerCase().includes(filtroLower)
    );
  }
}
