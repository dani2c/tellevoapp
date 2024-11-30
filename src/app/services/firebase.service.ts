import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
    this.cargarDestinos();
  }

  // Obtener destinos
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

  // Obtener dirección desde coordenadas
  obtenerDireccion(coordenadas: { lat: number, lng: number }): Promise<string> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: coordenadas }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
          resolve(results[0].formatted_address);
        } else {
          reject('No se pudo obtener la dirección');
        }
      });
    });
  }

  // Obtener solicitudes filtradas por usuario autenticado
  obtenerSolicitudesPorUsuario(uid: string): Observable<any[]> {
    return this.firestore.collection('solicitudes', ref => ref.where('destinoId', '==', uid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }

  // Obtener estado de autenticación
  obtenerUsuarioAutenticado(): Observable<any> {
    return this.auth.authState;
  }

  // Obtener datos del usuario por UID
  obtenerUsuario(uid: string): Observable<any> {
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  // Registrar usuario con email, contraseña y otros datos
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

  // Iniciar sesión
  iniciarSesion(email: string, password: string): Promise<void> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Inicio de sesión exitoso');
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        let errorMsg = 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        switch (error.code) {
          case 'auth/user-not-found':
            errorMsg = 'No se encontró un usuario con ese correo.';
            break;
          case 'auth/wrong-password':
            errorMsg = 'La contraseña es incorrecta.';
            break;
          case 'auth/invalid-email':
            errorMsg = 'El formato del correo no es válido.';
            break;
          default:
            errorMsg = 'Algo salió mal. Verifica tus credenciales e inténtalo de nuevo.';
        }
        throw new Error(errorMsg); // Lanza un error con el mensaje personalizado
      });
  }
  

  // Agregar destino
  agregarDestino(uid: string, destino: { lat: number, lng: number }, nombre: string, apellido: string): Promise<any> {
    return this.firestore.collection('destinos').add({
      uid, // Asegura que aquí se guarda el UID del usuario
      destino,
      nombre,
      apellido
    }).then(docRef => {
      console.log('Destino agregado con ID:', docRef.id);
      return docRef;
    });
  }

  // Enviar solicitud
  enviarSolicitud(
    destinoId: string,
    pasajeroId: string,
    nombrePasajero: string,
    apellidoPasajero: string,
    telefono: string,
    creadorUid: string, // UID del creador del destino
    ubicacion: string // Nuevo campo para la ubicación
  ): Promise<void> {
    return this.firestore.collection('solicitudes').add({
      destinoId,
      pasajeroId,
      nombrePasajero,
      apellidoPasajero,
      telefono,
      creadorUid, // Guardamos el UID del creador del destino
      ubicacion // Guardamos la ubicación
    }).then(() => {
      console.log('Solicitud enviada correctamente con ubicación.');
    }).catch(error => {
      console.error('Error al enviar la solicitud:', error);
      throw error;
    });
  }
  

  // Eliminar destino
  eliminarDestino(id: string): Promise<void> {
    return this.firestore.collection('destinos').doc(id).delete();
  }

  // Cerrar sesión
  cerrarSesion(): Promise<void> {
    return this.auth.signOut().then(() => {
      console.log('Cierre de sesión exitoso');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
      throw error;
    });
  }

  obtenerSolicitudes(): Observable<any[]> {
    return this.firestore.collection('solicitudes').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data }; // Retornar todas las solicitudes
        })
      )
    );
  }

  obtenerSolicitudesPorCreador(creadorUid: string): Observable<any[]> {
    return this.firestore.collection('solicitudes', ref => ref.where('creadorUid', '==', creadorUid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
  }
}


















