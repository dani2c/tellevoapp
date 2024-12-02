import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  solicitudes$: Observable<any[]> = of([]);
  cargando = false;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarHistorial();
  }

  async cargarHistorial() {
    this.cargando = true;

    if (navigator.onLine) {
      console.log('Cargando historial desde Firebase.');
      this.firebaseService.obtenerUsuarioAutenticado().subscribe(async (user) => {
        if (user) {
          const historial = await this.firebaseService.sincronizarHistorialLocal(user.uid);
          console.log('Historial sincronizado:', historial);
          this.solicitudes$ = of(historial);
        } else {
          console.error('No se pudo obtener el usuario autenticado.');
          this.solicitudes$ = of([]);
        }
        this.cargando = false;
      });
    } else {
      console.log('Cargando historial desde almacenamiento local.');
      const historialLocal = JSON.parse(localStorage.getItem('historial') || '[]');
      this.solicitudes$ = of(historialLocal);
      this.cargando = false;
    }
  }
}







