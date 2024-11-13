import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

declare var google: any;

@Component({
  selector: 'app-seleccionar-viajes-disponibles',
  templateUrl: './seleccionar-viajes-disponibles.page.html',
  styleUrls: ['./seleccionar-viajes-disponibles.page.scss'],
})
export class SeleccionarViajesDisponiblesPage implements AfterViewInit {
  map: any;
  destinos$: Observable<any[]>;
  usuarioActivo: any = null;

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {
    this.destinos$ = this.firebaseService.obtenerDestinos();
  }

  async ngAfterViewInit() {
    this.cargarMapa();
    this.obtenerUsuarioActivo();
    this.cargarDestinosConUsuarios();
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 }; // Concepción, Chile
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });
  }

  cargarDestinosConUsuarios() {
    this.destinos$.subscribe(destinos => {
      destinos.forEach(destino => {
        if (destino.destino) {
          // Obtener dirección
          this.firebaseService.obtenerDireccion(destino.destino).then(direccion => {
            destino.direccion = direccion;
          });

          // Si no tiene nombre y apellido, obtenerlos
          if (!destino.nombre || !destino.apellido) {
            this.firebaseService.obtenerUsuario(destino.uid).subscribe(usuarioData => {
              if (usuarioData) {
                destino.nombre = usuarioData.nombre;
                destino.apellido = usuarioData.apellido;
              }
            });
          }

          // Agregar marcador al mapa
          new google.maps.Marker({
            position: destino.destino,
            map: this.map,
            title: `Chofer: ${destino.nombre || ''} ${destino.apellido || ''}`,
          });
        }
      });
    });
  }

  obtenerUsuarioActivo() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        this.usuarioActivo = user;
      }
    });
  }

  async eliminarDestino(destinoId: string) {
    await this.firebaseService.eliminarDestino(destinoId);
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
}






