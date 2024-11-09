import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { FirebaseService } from 'src/app/services/firebase.service';

declare var google: any;

@Component({
  selector: 'app-seleccionar-viajes-disponibles',
  templateUrl: './seleccionar-viajes-disponibles.page.html',
  styleUrls: ['./seleccionar-viajes-disponibles.page.scss'],
})
export class SeleccionarViajesDisponiblesPage implements AfterViewInit {
  map: any;
  viajesDisponibles: any[] = [];
  usuarioActivo: usuarioLog | null = null;
  geocoder: any;

  constructor(
    private navCtrl: NavController,
    private localdbService: LocaldbService,
    private firebaseService: FirebaseService
  ) {}

  async ngAfterViewInit() {
    this.geocoder = new google.maps.Geocoder(); // Inicializar el geocoder
    await this.obtenerUsuarioActivo();
    await this.cargarViajes();
    this.cargarMapa();

    // Prueba de conexión con Firebase: Agregar documento de prueba
    this.firebaseService.agregarPrueba({ mensaje: 'Prueba de conexión con Firebase' })
      .then(() => console.log('Documento de prueba agregado en Firebase'))
      .catch(error => console.error('Error al agregar documento en Firebase:', error));
  }

  async obtenerUsuarioActivo() {
    const username = await this.localdbService.obtener('usuarioActivo');
    if (username) {
      this.usuarioActivo = await this.localdbService.obtener(username);
    }
  }

  async cargarViajes() {
    this.viajesDisponibles = (await this.localdbService.obtener('viajes')) || [];

    // Convertir coordenadas en direcciones
    for (const viaje of this.viajesDisponibles) {
      viaje.direccion = await this.obtenerDireccion(viaje.destino.lat, viaje.destino.lng);
    }
  }

  obtenerDireccion(lat: number, lng: number): Promise<string> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({ location: { lat, lng } }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].formatted_address); // Direccion obtenida
        } else {
          resolve('Dirección no disponible'); // Error o sin resultados
        }
      });
    });
  }

  cargarMapa() {
    const centroInicial = this.viajesDisponibles.length
      ? { lat: this.viajesDisponibles[0].destino.lat, lng: this.viajesDisponibles[0].destino.lng }
      : { lat: -36.826992, lng: -73.049766 }; // Coordenadas de Concepción, Chile

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });

    this.viajesDisponibles.forEach((viaje) => {
      new google.maps.Marker({
        position: viaje.destino,
        map: this.map,
        title: `Chofer: ${viaje.nombre} ${viaje.apellido}`,
      });
    });
  }

  async eliminarViaje(viaje: any) {
    this.viajesDisponibles = this.viajesDisponibles.filter(v => v !== viaje);
    await this.localdbService.guardar('viajes', this.viajesDisponibles);
    this.cargarMapa();
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}