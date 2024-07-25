import { Component } from '@angular/core';
import { Festival } from '../../../interfaces/festival';
import { FestivalService } from '../../../services/festival.service';
import { DivisaPipe } from '../../../pipes/divisa.pipe';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FilterFestivalsPipe } from '../../../pipes/filter-festivals.pipe';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-festivals',
  standalone: true,
  imports: [DivisaPipe, RouterModule, FormsModule, FilterFestivalsPipe],
  templateUrl: './festivals.component.html',
  styleUrls: ['./festivals.component.css']
})
export class FestivalsComponent {
  festivals: Festival[] = [];
  filtro: string = '';
  selectedFestival: Festival | null = null;

  constructor(private festivalService: FestivalService) {
    this.loadFestivals();
  }

  loadFestivals() {
    this.festivalService.getAll().subscribe({
      next: (response) => {
        this.festivals = response as Festival[];
      },
      error: (error) => {
        console.error('Error al cargar los festivales', error);
      }
    });
  }

  editar(festivalId: string) {
    console.log('ID del festival a editar:', festivalId);
    const festival = this.festivals.find(v => v._id === festivalId);
    console.log('Festival encontrado:', festival);

    if (festival) {
        Swal.fire({
            title: `Editar festival ${festival.festivalName} ${festival.type}`,
            html: `<div>
              <div>
                <label class="form-label">Nombre del festival</label>
                <input id="festivalName" type="text" class="form-control" value="${festival.festivalName}">
              </div>
              <div>
                <label class="form-label">Tipo</label>
                <input id="type" type="text" class="form-control" value="${festival.type}">
              </div>
              <div>
                <label class="form-label">Descripción</label>
                <input id="description" type="text" class="form-control" value="${festival.description}">
              </div>
              <div>
                <label class="form-label">Precio</label>
                <input id="price" type="number" class="form-control" value="${festival.price}">
              </div>
              <div>
                <label class="form-label">Localización</label>
                <input id="location" type="number" class="form-control" value="${festival.location}">
              </div>
            </div>`,
            showCancelButton: true,
            confirmButtonText: 'Guardar cambios',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const festivalName = (document.getElementById('festivalName') as HTMLInputElement).value;
                const type = (document.getElementById('type') as HTMLInputElement).value;
                const description = (document.getElementById('description') as HTMLInputElement).value;
                const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
                const location = parseInt((document.getElementById('location') as HTMLInputElement).value, 10);
                console.log('Datos de festivales actualizados:', { festivalName, type, description, price, location });
                return { festivalName, type, description, price, location };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedFestival = result.value;
                console.log('Datos confirmados para actualizar', updatedFestival);
                this.festivalService.updateFestival(festivalId, updatedFestival).subscribe({
                    next: () => {
                        Swal.fire({
                            title: '¡Festival actualizado!',
                            text: 'El festival ha sido actualizado correctamente',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 2000
                        });
                        window.location.reload(); // Recargar la página
                        Object.assign(festival, updatedFestival);
                        console.log('Festival después de la actualización:', festival);
                    },
                    
                    error: (error) => {
                        console.error('Error al actualizar:', error);
                        Swal.fire({
                            title: 'Oops!',
                            text: 'Ha ocurrido un error al actualizar el festival',
                            icon: 'error',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    } else {
        console.error('No se encontró el festival a editar');
    }
}


  eliminar(festivalId: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.festivalService.deleteFestival(festivalId).subscribe({
          next: () => {
            Swal.fire({
              title: '¡Festival eliminado!',
              text: 'El festival ha sido eliminado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.festivals = this.festivals.filter(v => v._id !== festivalId);
          },
          error: () => {
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al eliminar el festival',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }

  addNewFestival() {
    Swal.fire({
      title: 'Agregar nuevo festival',
      html: `<div>
        <div>
          <label class="form-label">Nombre del festival</label>
          <input id="festivalName" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Tipo</label>
          <input id="type" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Descripción</label>
          <input id="description" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label">Precio</label>
          <input id="price" type="number" class="form-control">
        </div>
        <div>
          <label class="form-label">Localización</label>
          <input id="location" type="number" class="form-control">
        </div>
        <div>
          <label class="form-label">URL de la imagen</label>
          <input id="image" type="text" class="form-control">
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        const festivalName = (document.getElementById('festivalName') as HTMLInputElement).value;
        const type = (document.getElementById('type') as HTMLInputElement).value;
        const description = (document.getElementById('description') as HTMLInputElement).value;
        const price = parseFloat((document.getElementById('price') as HTMLInputElement).value);
        const location = parseInt((document.getElementById('location') as HTMLInputElement).value, 10);
        const image = (document.getElementById('image') as HTMLInputElement).value;
  
        return { festivalName, type, description, price, location, image };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newFestival = result.value;
        this.festivalService.addFestival(newFestival).subscribe({
          next: (response:any) => {
            Swal.fire({
              title: 'Festival agregado!',
              text: 'El nuevo festival ha sido agregado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2000
            });
            this.festivals.push(response.festival as Festival);
            console.log(this.festivals)
            window.location.reload(); // Recargar la página

          },
          error: (error) => {
            console.error('Error al agregar festival:', error);
            Swal.fire({
              title: 'Oops!',
              text: 'Ha ocurrido un error al agregar el festival',
              icon: 'error',
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
      }
    });
  }
  

}