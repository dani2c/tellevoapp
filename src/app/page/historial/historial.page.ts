import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  solicitudes$: Observable<any[]> = new Observable<any[]>();

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  cargarHistorial() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        console.log('Usuario activo:', user);
        this.solicitudes$ = this.firebaseService.obtenerSolicitudesPorCreador(user.uid).pipe(
          map(solicitudes => solicitudes.map(solicitud => ({
            nombrePasajero: solicitud.nombrePasajero,
            apellidoPasajero: solicitud.apellidoPasajero,
            telefono: solicitud.telefono
          })))
        );
      } else {
        console.error('No se pudo obtener el usuario autenticado.');
      }
    });
  }
}




