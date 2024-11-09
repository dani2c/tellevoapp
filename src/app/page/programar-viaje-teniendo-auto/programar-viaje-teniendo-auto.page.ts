import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';
import { usuarioLog } from 'src/app/interfaces/usuario-log';

declare var google: any;

@Component({
  selector: 'app-programar-viaje-teniendo-auto',
  templateUrl: './programar-viaje-teniendo-auto.page.html',
  styleUrls: ['./programar-viaje-teniendo-auto.page.scss'],
})
export class ProgramarViajeTeniendoAutoPage implements AfterViewInit {
  map: any;
  marker: any;
  destinoSeleccionado: { lat: number, lng: number } | null = null;
  usuario: usuarioLog | null = null;

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private db: LocaldbService
  ) {}

  ngAfterViewInit() {
    this.loadMap();
    this.obtenerUsuarioActivo();
  }

  loadMap() {
    const mapOptions = {
      center: { lat: -33.4489, lng: -70.6693 },
      zoom: 13,
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    this.map.addListener('click', (event: any) => {
      this.agregarMarcador(event.latLng);
    });
  }

  agregarMarcador(position: any) {
    if (this.marker) {
      this.marker.setMap(null); // Eliminar marcador anterior
    }

    this.marker = new google.maps.Marker({
      position: position,
      map: this.map,
    });

    this.destinoSeleccionado = {
      lat: position.lat(),
      lng: position.lng(),
    };
  }

  async obtenerUsuarioActivo() {
    // Recuperar el username del usuario activo
    const username = await this.db.obtener('usuarioActivo');
    if (username) {
      // Obtener la información completa del usuario usando el username
      this.usuario = await this.db.obtener(username);
    }
  }

  async confirmarDestino() {
    if (!this.destinoSeleccionado) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, seleccione un destino en el mapa',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.usuario) {
      const viaje = {
        ...this.usuario,
        destino: this.destinoSeleccionado
      };

      // Recuperar viajes previos y agregar el nuevo
      const viajes = (await this.db.obtener('viajes')) || [];
      viajes.push(viaje);
      await this.db.guardar('viajes', viajes);

      // Redirigir a la página "le-notificaremos"
      this.navCtrl.navigateForward('/le-notificaremos');
    }
  }

  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}
