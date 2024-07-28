import { Component, OnInit } from '@angular/core';
import { Festival } from '../../interfaces/festival';
import { FestivalService } from '../../services/festival.service';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterFestivalsPipe } from '../../pipes/filter-festivals.pipe';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DivisaPipe, RouterModule, FormsModule, FilterFestivalsPipe, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  festivals: Festival[] = [];
  filtro: string = '';
  isAdmin: boolean = false;

  constructor(
    private festivalService: FestivalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.festivalService.getAll().subscribe({
      next: (response) => {
        this.festivals = response as Festival[];
        console.log(this.festivals);
      },
      error: () => {}
    });

    this.isAdmin = this.authService.isUserAdmin();
    console.log('Is user admin:', this.isAdmin); // Verificar si el usuario es admin
  }
}
