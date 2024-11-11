import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
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
  usuarioActivo: usuarioLog | null = null;
  marcadorDestino: any = null;

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService
  ) {}

  ngAfterViewInit() {
    this.cargarMapa();
    this.obtenerUsuarioActivo();
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 }; // Coordenadas iniciales de Concepción, Chile

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });

    // Evento para seleccionar el destino
    this.map.addListener('click', (event: any) => {
      this.destinoSeleccionado = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };

      // Remover marcador anterior si existe
      if (this.marcadorDestino) {
        this.marcadorDestino.setMap(null);
      }

      // Colocar el nuevo marcador en el destino seleccionado
      this.marcadorDestino = new google.maps.Marker({
        position: this.destinoSeleccionado,
        map: this.map,
      });
    });
  }

  async obtenerUsuarioActivo() {
    // Obtener el usuario autenticado actual desde Firebase
    const user = await this.firebaseService.obtenerUsuarioAutenticado();
    console.log("Usuario autenticado:", user);

    if (user) {
      this.usuarioActivo = await this.firebaseService.obtenerUsuario(user.uid).toPromise();
      console.log("Datos del usuario activo:", this.usuarioActivo);
    }
  }

  async confirmarDestino() {
    if (!this.destinoSeleccionado) {
      alert('Por favor, seleccione un destino en el mapa.');
      return;
    }

    if (!this.usuarioActivo) {
      alert('No se pudieron obtener los datos del usuario. Intente cerrar sesión y volver a ingresar.');
      return;
    }

    // Crear el objeto de viaje con los datos del chofer y destino
    const viaje = {
      nombre: this.usuarioActivo.nombre,
      apellido: this.usuarioActivo.apellido,
      destino: this.destinoSeleccionado
    };

    // Guardar el viaje en Firebase
    try {
      await this.firebaseService.agregarViaje(viaje);
      alert('¡Viaje programado con éxito!');
      this.navCtrl.navigateForward('/le-notificaremos');
    } catch (error) {
      console.error("Error al guardar el viaje:", error);
    }
  }

  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}
