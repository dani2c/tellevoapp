import { Component, AfterViewInit} from '@angular/core';
import { LocaldbService } from 'src/app/services/localdb.service';
import * as L from 'leaflet';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-seleccionar-viajes-disponibles',
  templateUrl: './seleccionar-viajes-disponibles.page.html',
  styleUrls: ['./seleccionar-viajes-disponibles.page.scss'],
})
export class SeleccionarViajesDisponiblesPage implements AfterViewInit{

  private map: any;  // Definimos la variable map
  public viajesDisponibles: any[] = []; // Lista de viajes disponibles

  constructor(private localdb: LocaldbService, private navCtrl: NavController) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.initializeMap();
    this.cargarViajesDisponibles();
  }

  initializeMap() {
    this.map = L.map('map').setView([-36.8269, -73.0498], 12); // Posición inicial en Concepción, Chile
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  async cargarViajesDisponibles() {
    const keys = await this.localdb.getKeys(); // Obtenemos todas las claves del storage
    this.viajesDisponibles = [];

    for (const key of keys) {
      if (key.startsWith('viaje_')) {
        const viaje = await this.localdb.obtener(key); // Obtenemos los datos del viaje
        this.viajesDisponibles.push(viaje);

        // Agregamos un marcador en el mapa para cada viaje disponible
        if (viaje.destino) {
          L.marker([viaje.destino.lat, viaje.destino.lng]).addTo(this.map)
            .bindPopup(`${viaje.nombre} ${viaje.apellido} - Capacidad: ${viaje.capacidad}`);
        }
      }
    }
  }
  verDetalleChofer(viaje: any) {
    // Aquí puedes implementar una función para mostrar detalles del chofer o redirigir a otra página.
  }

  goToRealizado(){
    this.navCtrl.navigateForward('/realizado')
  }
  goToProgramarViajeConAuto(){
    this.navCtrl.navigateForward('/programar-viaje-con-auto')
  }
}
