import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Festival } from '../../interfaces/festival';
import { FestivalService } from '../../services/festival.service';
import { DivisaPipe } from '../../pipes/divisa.pipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { BookingFormData } from '../../interfaces/booking-form-data';
import { BookingService } from '../../services/booking.service';
import Swal from "sweetalert2"
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-rent',
  standalone: true,
  imports: [DivisaPipe, ReactiveFormsModule, RouterModule],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.css',
})
export class BuyComponent implements OnDestroy {
  parametro: string | null = null;
  festival: Festival | null = null;
  mostrarCodigoPromocional: boolean = false;
  form!: FormGroup;
  safeUrl!: SafeResourceUrl;

  constructor(
    private route: ActivatedRoute,
    private festivalService: FestivalService,
    private builder: FormBuilder,
    public authService: AuthService,
    private cookieService: CookieService,
    private bookingService: BookingService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // abrir la cookie a ver si hay datos en el booking-form-data y sustituirlos en los null
    let data: BookingFormData = {startDate: null, endDate: null, promoCode: null}
    if(cookieService.check("booking-form-data")){
      data = JSON.parse(cookieService.get("booking-form-data"))
    }
    this.form = builder.group({
      "fechaInicio": new FormControl(data.startDate, [Validators.required]),
      "fechaFin": new FormControl(data.endDate, [Validators.required]),
      "codigoPromocional": new FormControl(data.promoCode, []),
    });
   

    route.paramMap.subscribe((params) => {
      this.parametro = params.get('id');
    });

    if (this.parametro !== null) {
      festivalService.getById(this.parametro).subscribe({
        next: (response) => {
          this.festival = response as Festival;
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.festival.video);
        },
        error: () => {},
      });
    }
  }

  ngOnDestroy(): void {
    const data: BookingFormData = {
      endDate: this.form.value.fechaFin,
      startDate: this.form.value.fechaInicio,
      promoCode: this.form.value.codigoPromocional
    }

    this.cookieService.set("booking-form-data", JSON.stringify(data))

    //console.log("Adiós rent", this.form.value)
  }

 
 public get numDias() : number {
    const fechaini = new Date(this.form.value.fechaInicio) 
    const fechafin = new Date(this.form.value.fechaFin)

    const millisDif = fechafin.getTime() - fechaini.getTime()
    const dias = millisDif / 1000 / 60 / 60 / 24
    if(dias < 0){
      return 0
    }
    else{
      return dias
    }
 }

 enviar(){
  this.bookingService.saveBooking(this.festival!._id, this.form.value.fechaInicio,
    this.form.value.fechaFin, this.numDias * this.festival!.price, 0).subscribe({
      next: ()=>{
        Swal.fire({
          title: "Reserva realizada",
          text: `Tu ${this.festival!.festivalName} ${this.festival!.type} está listo`,
          icon: "success",
          timer: 2000,
          didClose: ()=>{
            this.router.navigateByUrl("/me/my-bookings")
          }
        })
        
      },
      error: ()=>{
        Swal.fire({
          title: "Oops",
          text: "Ha ocurrido un error con tu reserva",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        })
      }
    })
 }
 
}
