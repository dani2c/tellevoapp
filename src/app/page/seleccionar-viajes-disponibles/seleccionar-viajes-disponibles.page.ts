import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
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
  viajesDisponibles: any[] = [];
  usuarioActivo: any = null;
  viajes$: Observable<any[]>;

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {
    // Suscribirse a los cambios en tiempo real de la colección de "viajes" en Firebase
    this.viajes$ = this.firebaseService.obtenerViajes();
  }

  async ngAfterViewInit() {
    console.log("ngAfterViewInit: Iniciando mapa y obteniendo usuario activo.");
    this.cargarMapa();
    await this.obtenerUsuarioActivo();

    // Actualizar la lista de viajes cada vez que Firebase emita cambios
    this.viajes$.subscribe(viajes => {
      console.log("Viajes obtenidos desde Firebase:", viajes);
      this.viajesDisponibles = viajes;
      this.cargarMapa(); // Actualizar el mapa cuando haya cambios en los viajes
    });
  }

  cargarMapa() {
    const centroInicial = this.viajesDisponibles.length
      ? { lat: this.viajesDisponibles[0].destino.lat, lng: this.viajesDisponibles[0].destino.lng }
      : { lat: -36.826992, lng: -73.049766 };

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });

    this.viajesDisponibles.forEach((viaje) => {
      if (viaje.destino && viaje.destino.lat && viaje.destino.lng) {
        new google.maps.Marker({
          position: viaje.destino,
          map: this.map,
          title: `Chofer: ${viaje.nombre} ${viaje.apellido}`,
        });
      }
    });
  }

  async obtenerUsuarioActivo() {
    console.log("Obteniendo usuario activo...");
    const user = await this.firebaseService.obtenerUsuarioAutenticado();
    if (user) {
      this.usuarioActivo = await this.firebaseService.obtenerUsuario(user.uid).toPromise();
      console.log("Usuario activo obtenido:", this.usuarioActivo);
    } else {
      console.log("No se pudo obtener el usuario activo.");
    }
  }

  async eliminarViaje(viajeId: string) {
    await this.firebaseService.eliminarViaje(viajeId);
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
}