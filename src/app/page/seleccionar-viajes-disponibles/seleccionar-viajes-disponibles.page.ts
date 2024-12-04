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
  markers: { id: string; marker: any }[] = [];

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
      this.limpiarMarcadores();

      destinos.forEach(destino => {
        if (destino.destino) {
          this.firebaseService.obtenerDireccion(destino.destino).then(direccion => {
            destino.direccion = direccion;
          });

          if (!destino.nombre || !destino.apellido) {
            this.firebaseService.obtenerUsuario(destino.uid).subscribe(usuarioData => {
              if (usuarioData) {
                destino.nombre = usuarioData.nombre;
                destino.apellido = usuarioData.apellido;
              }
            });
          }

          const marker = new google.maps.Marker({
            position: destino.destino,
            map: this.map,
            title: `Chofer: ${destino.nombre || ''} ${destino.apellido || ''}`,
          });
          this.markers.push({ id: destino.id, marker });
        }
      });
    });
  }

  limpiarMarcadores() {
    this.markers.forEach(m => m.marker.setMap(null));
    this.markers = [];
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

  async eliminarDestino(destinoId: string) {
    try {
      await this.firebaseService.eliminarDestino(destinoId);

      const markerIndex = this.markers.findIndex((m) => m.id === destinoId);
      if (markerIndex !== -1) {
        this.markers[markerIndex].marker.setMap(null);
        this.markers.splice(markerIndex, 1);
      }

      const alert = await this.alertController.create({
        header: 'Éxito',
        message: 'Destino eliminado correctamente.',
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      console.error('Error al eliminar destino:', error);
    }
  }

  async solicitarViaje(destinoId: string, destinoUid: string, nombreChofer: string) {
    try {
      // Verificar la capacidad antes de enviar la solicitud
      const capacidadRestante = await this.firebaseService.verificarCapacidad(destinoId);
  
      if (capacidadRestante <= 0) {
        const alert = await this.alertController.create({
          header: 'Capacidad llena',
          message: 'El vehículo ha alcanzado su capacidad máxima. No se pueden realizar más solicitudes para este destino.',
          buttons: ['OK'],
        });
        await alert.present();
        return; // Salir del método si la capacidad está llena
      }
  
      // Obtener los datos del destino desde Firebase
      const destinoDoc = await this.firebaseService.obtenerDestino(destinoId);
      const destinoData = destinoDoc || { ubicacion: 'Ubicación no disponible' }; // Asignar valor predeterminado
  
      // Asegurar que `ubicacion` siempre sea un string
      const ubicacion = destinoData.ubicacion || 'Ubicación no disponible';
  
      // Enviar la solicitud con todos los datos necesarios
      await this.firebaseService.enviarSolicitud(
        destinoId,
        this.usuarioActivo.uid,
        this.usuarioActivo.nombre,
        this.usuarioActivo.apellido,
        this.usuarioActivo.telefono,
        destinoUid,
        ubicacion // Ubicación garantizada como string
      );
  
      const alert = await this.alertController.create({
        header: 'Solicitud enviada',
        message: `Te has unido al viaje con ${nombreChofer}.`,
        buttons: ['OK'],
      });
      await alert.present();
    } catch (error) {
      console.error('Error al solicitar viaje:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Ocurrió un error al procesar tu solicitud. Por favor, intenta nuevamente.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
  

  
  

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }

  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
}









