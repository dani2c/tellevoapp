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

  constructor(private navCtrl: NavController, private firebaseService: FirebaseService) {
    // Obtener destinos desde Firebase en tiempo real
    this.destinos$ = this.firebaseService.obtenerDestinos();
  }

  ngAfterViewInit() {
    this.cargarMapa();

    // Actualizar el mapa cada vez que se emiten cambios en los destinos de Firebase
    this.destinos$.subscribe(destinos => {
      this.cargarDestinosEnMapa(destinos);
    });
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 };

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });
  }

  cargarDestinosEnMapa(destinos: any[]) {
    destinos.forEach((destino) => {
      if (destino.destino) {
        new google.maps.Marker({
          position: destino.destino,
          map: this.map,
          title: `Destino de Usuario: ${destino.uid}`,
        });
      }
    });
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
}
