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
  usuarioActivo: any = null;
  marcadorDestino: any = null;
  costoFijo: number | null = null; // Nuevo campo
  capacidad: number | null = null; // Nuevo campo


  constructor(
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {}

  async ngAfterViewInit() {
    this.cargarMapa();
    await this.obtenerUsuarioActivo();
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

  async obtenerUsuarioActivo() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe((user) => {
      if (user) {
        this.firebaseService.obtenerUsuario(user.uid).subscribe((usuarioData) => {
          if (usuarioData) {
            this.usuarioActivo = { ...usuarioData, uid: user.uid }; 
            console.log("Usuario activo obtenido:", this.usuarioActivo);
          }
        });
      }
    });
  }

  async confirmarDestino() {
    if (!this.destinoSeleccionado) {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Por favor, seleccione un destino en el mapa.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.costoFijo || !this.capacidad) {
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'Debe ingresar un costo fijo y la capacidad del vehículo.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.usuarioActivo || !this.usuarioActivo.uid) { 
      const alert = await this.alertController.create({
        header: 'Atención',
        message: 'No se pudieron obtener los datos del usuario. Intente cerrar sesión y volver a ingresar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }
    console.log('Capacidad ingresada:', this.capacidad);
    console.log('Costo por persona ingresado:', this.costoFijo);

    const viaje = {
      uid: this.usuarioActivo.uid,
      nombre: this.usuarioActivo.nombre,
      apellido: this.usuarioActivo.apellido,
      destino: this.destinoSeleccionado
    };

    try {
      await this.firebaseService.agregarDestinoConCosto(
        this.usuarioActivo.uid,
        this.destinoSeleccionado,
        this.usuarioActivo.nombre,
        this.usuarioActivo.apellido,
        this.costoFijo,
        this.capacidad
      );
      const alert = await this.alertController.create({
        header: '¡Éxito!',
        message: '¡Viaje programado con éxito! se le notificará en la pestaña historial cuando alguien quiera unirse a su viaje',
        buttons: ['OK']
      });
      await alert.present();
      this.navCtrl.navigateForward('/home');
    } catch (error) {
      console.error("Error al guardar el destino:", error);
    }
  }

  goToPidiendoAuto() {
    this.navCtrl.navigateForward('/pidiendo-auto');
  }
  goToLogin(){
    this.navCtrl.navigateForward('/login')
  }
  goToHistorial(){
    this.navCtrl.navigateForward('/historial')
  }  
}




