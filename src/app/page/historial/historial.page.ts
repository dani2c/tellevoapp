import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  solicitudes$: Observable<any[]>;

  constructor(private firebaseService: FirebaseService,
    private navCtrl: NavController
  ) {
    this.solicitudes$ = this.firebaseService.obtenerSolicitudes();
  }
  goToHome(){
    this.navCtrl.navigateForward('/home')
  } 
  ngOnInit() {}
}
