import { Component, AfterViewInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

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


  cargarDestinosConUsuarios() {
    this.destinos$.subscribe(destinos => {
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

          // Agregar marcador al mapa
          new google.maps.Marker({
            position: destino.destino,
            map: this.map,
            title: `Chofer: ${destino.nombre || ''} ${destino.apellido || ''}`,
          });
        }
      });
    });
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
            console.log("Usuario activo cargado:", this.usuarioActivo);
          } else {
            console.log("Error: Los datos del usuario no se pudieron cargar.");
          }
        });
      } else {
        console.log("Error: No hay un usuario autenticado.");
      }
    });
  }

  async eliminarDestino(destinoId: string) {
    await this.firebaseService.eliminarDestino(destinoId);
  }

  goToProgramarViajeConAuto() {
    this.navCtrl.navigateForward('/programar-viaje-con-auto');
  }
}






