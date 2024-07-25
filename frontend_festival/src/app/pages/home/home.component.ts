import { Component } from '@angular/core';
import { Festival } from '../../interfaces/festival';
import { FestivalService } from '../../services/festival.service';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterFestivalsPipe } from '../../pipes/filter-festivals.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DivisaPipe, RouterModule, FormsModule, FilterFestivalsPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  festivals: Festival[] =[]
  filtro: string = ""

  constructor(private festivalService: FestivalService){
    festivalService.getAll().subscribe({
      next: (response)=>{
        this.festivals = response as Festival[]
      },
      error: ()=>{}
    })
  }
}
