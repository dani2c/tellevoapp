import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

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

    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        console.log('Usuario autenticado:', user);
        this.usuarioActivo = user;
      }
    });
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 }; // Concepción, Chile
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });

    this.destinos$.subscribe(destinos => {
      destinos.forEach(destino => {
        if (destino.destino) {
          new google.maps.Marker({
            position: destino.destino,
            map: this.map,
            title: `Chofer: ${destino.nombre} ${destino.apellido}`,
          });
        }
      });
    });
  }

  async eliminarDestino(destinoId: string) {
    console.log(`Eliminando destino con ID: ${destinoId}`);
    await this.firebaseService.eliminarDestino(destinoId);
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
}





