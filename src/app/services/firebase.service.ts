import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private destinosSubject = new BehaviorSubject<any[]>([]);

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.cargarDestinos(); // Cargar destinos cuando se inicia el servicio
  }

  obtenerDestinos(): Observable<any[]> {
    return this.destinosSubject.asObservable();
  }

  private cargarDestinos() {
    this.firestore.collection('destinos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    ).subscribe(destinos => {
      destinos.forEach(async (destino) => {
        if (destino.destino) {
          destino.direccion = await this.obtenerDireccion(destino.destino);
        }
      });
      this.destinosSubject.next(destinos);
    });
  }

  obtenerDireccion(coordenadas: { lat: number, lng: number }): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coordenadas }, (results: any, status: any) => {
        if (status === 'OK' && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject('No se pudo obtener la dirección');
        }
      });
    });
  }

  obtenerUsuarioAutenticado(): Observable<any> {
    return this.auth.authState;
  }

  // Nuevo método para obtener datos de usuario
  obtenerUsuario(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  registrarUsuario(email: string, password: string, userData: any): Promise<void> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          return this.firestore.collection('usuarios').doc(uid).set(userData);
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      });
  }

  iniciarSesion(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password).then(() => {
      console.log('Inicio de sesión exitoso');
    });
  }

  agregarDestino(uid: string, destino: { lat: number, lng: number }, nombre: string, apellido: string): Promise<any> {
    return this.firestore.collection('destinos').add({
      uid,
      destino,
      nombre,
      apellido
    });
  }

  eliminarDestino(id: string): Promise<void> {
    return this.firestore.collection('destinos').doc(id).delete();
  }
}









