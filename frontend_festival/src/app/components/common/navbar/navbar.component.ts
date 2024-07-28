// import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [RouterModule],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {

//   constructor(){
  
//   }
// }

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService){
  
  }

  ngOnInit (): void {
    const menuIcon = document.getElementById('menu-icon')
    
  }

}
