import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-viaje-retorno',
  templateUrl: './viaje-retorno.page.html',
  styleUrls: ['./viaje-retorno.page.scss'],
})
export class ViajeRetornoPage implements OnInit {
  viajesRetorno$: Observable<any[]> = of([]);

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.cargarViajesRetorno();
  }

  async cancelarPedido(viajeId: string, destinoId: string) {
    try {
      if (navigator.onLine) {
        // Si hay conexión, realizar la operación en Firebase
        await this.firebaseService.cancelarPedido(viajeId, destinoId);
        console.log('Pedido cancelado exitosamente.');
  
        // Actualizar los datos locales después de la cancelación
        this.cargarViajesRetorno();
      } else {
        // Si no hay conexión, actualizar solo el almacenamiento local
        const viajesLocal = JSON.parse(localStorage.getItem('viajesRetorno') || '[]');
        const viajesActualizados = viajesLocal.filter((viaje: any) => viaje.id !== viajeId);
        localStorage.setItem('viajesRetorno', JSON.stringify(viajesActualizados));
        console.log('Pedido cancelado localmente.');
        this.cargarViajesRetorno(); // Refrescar la lista local
      }
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  }

  cargarViajesRetorno() {
    if (navigator.onLine) {
      // **Con conexión a internet**
      this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
        if (user) {
          this.viajesRetorno$ = this.firebaseService.obtenerViajesRetornoConDetalles(user.uid).pipe(
            map(viajes => {
              // Guardar los viajes de retorno en Local Storage
              localStorage.setItem('viajesRetorno', JSON.stringify(viajes));
              return viajes;
            })
          );
        }
      });
    } else {
      // **Sin conexión a internet**
      const viajesLocal = JSON.parse(localStorage.getItem('viajesRetorno') || '[]');
      this.viajesRetorno$ = of(viajesLocal);
    }
  }
}



