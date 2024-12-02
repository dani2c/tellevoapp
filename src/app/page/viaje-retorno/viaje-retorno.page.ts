import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-viaje-retorno',
  templateUrl: './viaje-retorno.page.html',
  styleUrls: ['./viaje-retorno.page.scss'],
})
export class ViajeRetornoPage implements OnInit {
  viajesRetorno$: Observable<any[]> = new Observable<any[]>();
  cargando = false;

  constructor(
    private firebaseService: FirebaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarViajesRetorno();
  }
  
  async cancelarPedido(viajeId: string, destinoId: string) {
    try {
      await this.firebaseService.cancelarPedido(viajeId, destinoId);
      console.log('Pedido cancelado exitosamente');
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
    }
  }
  
  cargarViajesRetorno() {
    this.firebaseService.obtenerUsuarioAutenticado().subscribe(user => {
      if (user) {
        this.viajesRetorno$ = this.firebaseService.obtenerViajesRetornoConDetalles(user.uid);
      } else {
        console.error('No se pudo obtener el usuario autenticado.');
      }
    });
  }
}

