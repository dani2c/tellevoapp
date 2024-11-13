import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  solicitudes$: Observable<any[]>;

  constructor(private firebaseService: FirebaseService) {
    this.solicitudes$ = this.firebaseService.obtenerSolicitudes();
  }

  ngOnInit() {}
}
