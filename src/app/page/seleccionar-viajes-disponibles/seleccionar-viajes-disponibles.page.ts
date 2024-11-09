import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';

declare var google: any;

@Component({
  selector: 'app-seleccionar-viajes-disponibles',
  templateUrl: './seleccionar-viajes-disponibles.page.html',
  styleUrls: ['./seleccionar-viajes-disponibles.page.scss'],
})
export class SeleccionarViajesDisponiblesPage implements AfterViewInit {
  map: any;
  viajesDisponibles: any[] = [];

  constructor(
    private navCtrl: NavController,
    private localdbService: LocaldbService
  ) {}

  async ngAfterViewInit() {
    await this.cargarViajes();
    this.cargarMapa();
  }

  async cargarViajes() {
    // Recupera los viajes guardados de los choferes desde el almacenamiento local
    this.viajesDisponibles = (await this.localdbService.obtener('viajes')) || [];
  }

  cargarMapa() {
    // Centro del mapa basado en el primer viaje disponible, o una ubicación predeterminada
    const centroInicial = this.viajesDisponibles.length
      ? { lat: this.viajesDisponibles[0].destino.lat, lng: this.viajesDisponibles[0].destino.lng }
      : { lat: -34.6037, lng: -58.3816 }; // Ubicación en Buenos Aires como ejemplo

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 14,
    });

    // Agregar marcadores para cada viaje disponible
    this.viajesDisponibles.forEach((viaje) => {
      new google.maps.Marker({
        position: viaje.destino,
        map: this.map,
        title: `Chofer: ${viaje.nombre} ${viaje.apellido}`,
      });
    });
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}
