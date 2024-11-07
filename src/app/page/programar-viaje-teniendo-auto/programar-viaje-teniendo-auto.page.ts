import { Component} from '@angular/core';
import * as L from 'leaflet';
import { NavController } from '@ionic/angular';
import { LocaldbService } from 'src/app/services/localdb.service';

@Component({
  selector: 'app-programar-viaje-teniendo-auto',
  templateUrl: './programar-viaje-teniendo-auto.page.html',
  styleUrls: ['./programar-viaje-teniendo-auto.page.scss'],
})
export class ProgramarViajeTeniendoAutoPage{

  private map: any;
  private destinationMarker: L.Marker | null = null;

  constructor(private localdb: LocaldbService, private navCtrl: NavController) {}

  ngOnInit() {
    this.initializeMap();
  }

  initializeMap() {
    this.map = L.map('map').setView([-36.8269, -73.0498], 12); // Posición inicial en Concepción, Chile

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Evento para seleccionar el destino
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      // Remover el marcador anterior si existe
      if (this.destinationMarker) {
        this.map.removeLayer(this.destinationMarker);
      }
      // Crear un nuevo marcador en la ubicación seleccionada
      this.destinationMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map);
    });
  }

  async confirmarViaje() {
    const usuario = await this.localdb.obtener('usuario');
    if (this.destinationMarker && usuario) {
      const latlng = this.destinationMarker.getLatLng();
      const viaje = {
        ...usuario,
        destino: {
          lat: latlng.lat,
          lng: latlng.lng,
        }
      };
      this.localdb.guardar(`viaje_${usuario.username}`, viaje);
      this.navCtrl.navigateForward('/le-notificaremos');
    } else {
      console.log("Por favor, seleccione un destino antes de confirmar el viaje.");
    }
  }

  goToLeNotificaremos(){
    this.navCtrl.navigateForward('/le-notificaremos')
  }
  goToPidiendoAuto(){
    this.navCtrl.navigateForward('/pidiendo-auto')
  }
}
