import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

declare var google: any;

@Component({
  selector: 'app-programar-viaje-teniendo-auto',
  templateUrl: './programar-viaje-teniendo-auto.page.html',
  styleUrls: ['./programar-viaje-teniendo-auto.page.scss'],
})
export class ProgramarViajeTeniendoAutoPage implements AfterViewInit {
  map: any;
  destinoSeleccionado: { lat: number, lng: number } | null = null;
  marcadorDestino: any = null;
  usuarioActivoUid: string | null = null;
  nombre: string = '';
  apellido: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private firebaseService: FirebaseService
  ) {}

  async ngAfterViewInit() {
    this.cargarMapa();
    this.obtenerUsuarioActivo();
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 };

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });

    this.map.addListener('click', (event: any) => {
      this.destinoSeleccionado = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      if (this.marcadorDestino) {
        this.marcadorDestino.setMap(null);
      }

      this.marcadorDestino = new google.maps.Marker({
        position: this.destinoSeleccionado,
        map: this.map,
      });
    });
  }

  obtenerUsuarioActivo() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe((user) => {
      if (user) {
        this.usuarioActivoUid = user.uid;
        this.nombre = user.displayName?.split(" ")[0] || '';
        this.apellido = user.displayName?.split(" ")[1] || '';
      } else {
        this.mostrarAlerta("No se pudo obtener el usuario autenticado. Intente iniciar sesión nuevamente.");
      }
    });
  }

  async confirmarDestino() {
    if (!this.destinoSeleccionado) {
      await this.mostrarAlerta('Por favor, seleccione un destino en el mapa.');
      return;
    }

    if (!this.usuarioActivoUid) {
      await this.mostrarAlerta('No se pudo obtener el usuario autenticado. Intente iniciar sesión nuevamente.');
      return;
    }

    try {
      await this.firebaseService.agregarDestino(
        this.usuarioActivoUid,
        this.destinoSeleccionado,
        this.nombre,
        this.apellido
      );
      await this.mostrarAlerta('¡Destino guardado con éxito!');
      this.navCtrl.navigateForward('/le-notificaremos');
    } catch (error) {
      console.error("Error al guardar el destino:", error);
      await this.mostrarAlerta('Error al guardar el destino. Inténtelo nuevamente.');
    }
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}


