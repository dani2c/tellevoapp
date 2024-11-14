import { Component, AfterViewInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
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
  markers: { id: string; marker: any }[] = []; // Lista de marcadores

  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {
    this.destinos$ = this.firebaseService.obtenerDestinos();
  }

  async ngAfterViewInit() {
    this.cargarMapa();
    this.obtenerUsuarioActivo();
    this.cargarDestinosConUsuarios();
  }

  cargarMapa() {
    const centroInicial = { lat: -36.826992, lng: -73.049766 };
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: centroInicial,
      zoom: 13,
    });
  }

  cargarDestinosConUsuarios() {
    this.destinos$.subscribe(destinos => {
      // Limpiar marcadores actuales en el mapa
      this.limpiarMarcadores();

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

          // Crear y agregar un marcador al mapa
          const marker = new google.maps.Marker({
            position: destino.destino,
            map: this.map,
            title: `Chofer: ${destino.nombre || ''} ${destino.apellido || ''}`,
          });
          // Guardar el marcador en la lista con su ID
          this.markers.push({ id: destino.id, marker });
        }
      });
    });
  }

  limpiarMarcadores() {
    this.markers.forEach(m => m.marker.setMap(null));
    this.markers = []; // Vaciar la lista de marcadores
  }

  async eliminarDestino(destinoId: string) {
    await this.firebaseService.eliminarDestino(destinoId);

    // Buscar y remover el marcador correspondiente del mapa
    const markerIndex = this.markers.findIndex(m => m.id === destinoId);
    if (markerIndex !== -1) {
      this.markers[markerIndex].marker.setMap(null); // Quitar del mapa
      this.markers.splice(markerIndex, 1); // Remover de la lista
    }
  }

  obtenerUsuarioActivo() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        this.firebaseService.obtenerUsuario(user.uid).subscribe(usuarioData => {
          if (usuarioData) {
            this.usuarioActivo = {
              uid: user.uid,
              nombre: usuarioData.nombre,
              apellido: usuarioData.apellido,
              telefono: usuarioData.telefono
            };
          }
        });
      }
    });
  }

  async solicitarViaje(destinoId: string, nombreChofer: string) {
    if (this.usuarioActivo && this.usuarioActivo.nombre && this.usuarioActivo.apellido && this.usuarioActivo.telefono) {
      const alert = await this.alertController.create({
        header: `Ha sido agregado al vehículo de ${nombreChofer}`,
        buttons: [
          {
            text: 'Aceptar',
            handler: async () => {
              await this.firebaseService.enviarSolicitud(
                destinoId,
                this.usuarioActivo.uid,
                this.usuarioActivo.nombre,
                this.usuarioActivo.apellido,
                this.usuarioActivo.telefono
              );
              this.navCtrl.navigateForward('/home');
            }
          }
        ]
      });
      await alert.present();
    } else {
      console.log("Error: Datos del usuario incompletos:", this.usuarioActivo);
    }
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}







