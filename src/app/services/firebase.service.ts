import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';

declare var google: any;

// Interfaces definidas al inicio del archivo
interface DestinoData {
  capacidad: number;
  pasajeros: number;
  costoFijo: number;
  nombre: string;
  apellido: string;
  telefono: string;
  destino: { lat: number; lng: number };
}

interface SolicitudData {
  destinoId: string;
  pasajeroId: string;
  nombrePasajero: string;
  apellidoPasajero: string;
  telefono: string;
  creadorUid: string;
  ubicacion: string;
}

interface Destino {
  uid: string;
  destino: { lat: number; lng: number };
  nombre: string;
  apellido: string;
  costoFijo: number;
  capacidad: number;
  pasajeros: number;
}
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

  // Sincronizar historial al local storage
  async sincronizarHistorialLocal(uid: string): Promise<any[]> {
    try {
      const snapshot = await this.firestore
        .collection('solicitudes', (ref) => ref.where('creadorUid', '==', uid))
        .get()
        .toPromise();
  
      if (!snapshot || snapshot.empty) {
        console.log('No se encontraron solicitudes para este usuario.');
        return []; // Retorna un array vacío si no hay datos
      }
  
      const historial = snapshot.docs.map((doc) => {
        const data = doc.data();
        if (typeof data !== 'object' || data === null) {
          console.warn(`Datos inesperados para el documento ${doc.id}:`, data);
          return null; // Ignora datos que no sean objetos
        }
  
        return {
          id: doc.id,
          ...data,
        };
      }).filter((item) => item !== null); // Filtra los valores nulos
  
      // Almacenar en localStorage
      localStorage.setItem('historial', JSON.stringify(historial));
      console.log('Historial sincronizado localmente:', historial);
  
      return historial;
    } catch (error) {
      console.error('Error al sincronizar historial local:', error);
      return [];
    }
  }
  
  

  // Sincronizar viajes de retorno al local storage
  sincronizarViajesRetornoLocal(uid: string) {
    this.obtenerViajesRetornoConDetalles(uid).subscribe((viajesRetorno) => {
      localStorage.setItem('viajesRetorno', JSON.stringify(viajesRetorno));
    });
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
  iniciarSesion(email: string, password: string): Promise<firebase.default.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log('Inicio de sesión exitoso:', userCredential);
        return userCredential; // Devolvemos el objeto completo
      })
      .catch((error) => {
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
  async enviarSolicitud(
    destinoId: string,
    pasajeroId: string,
    nombrePasajero: string,
    apellidoPasajero: string,
    telefono: string,
    creadorUid: string,
    ubicacion: string
  ): Promise<void> {
    try {
      await this.firestore.collection('solicitudes').add({
        destinoId,
        pasajeroId,
        nombrePasajero,
        apellidoPasajero,
        telefono,
        creadorUid,
        ubicacion
      });
  
      // Incrementar pasajeros en destino
      await this.actualizarPasajeros(destinoId, 1);
  
      console.log('Solicitud enviada correctamente con actualización de pasajeros.');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      throw error;
    }
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

  agregarDestinoConCosto(
    uid: string,
    destino: { lat: number; lng: number },
    nombre: string,
    apellido: string,
    costoFijo: number,
    capacidad: number
  ): Promise<void> {
    return this.firestore.collection('destinos').add({
      uid,
      destino,
      nombre,
      apellido,
      costoFijo,
      capacidad,
      pasajeros: 0 // Inicializar la propiedad pasajeros
    }).then(() => {
      console.log('Destino con costo y capacidad agregado exitosamente.');
    }).catch((error) => {
      console.error('Error al agregar destino:', error);
      throw error;
    });
  }

  // Obtener viajes de retorno
  // Modificar obtenerViajesRetorno para incluir más datos relacionados
obtenerViajesRetorno(uid: string): Observable<any[]> {
  return this.firestore.collection('solicitudes', ref => ref.where('pasajeroId', '==', uid))
    .snapshotChanges()
    .pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;

        // Depuración: Verificar los datos que se obtienen
        console.log('Solicitud obtenida:', data);

        // Retornar los datos completos del viaje
        return { id, ...data };
      }))
    );
}

  // Actualizar capacidad del viaje
  async actualizarCapacidad(viajeId: string, nuevaCapacidad: number): Promise<void> {
    return this.firestore.collection('solicitudes').doc(viajeId).update({ capacidad: nuevaCapacidad });
  }

  obtenerViajesRetornoConDetalles(uid: string): Observable<any[]> {
    return this.firestore.collection('solicitudes', ref => ref.where('pasajeroId', '==', uid))
      .snapshotChanges()
      .pipe(
        mergeMap(actions =>
          Promise.all(
            actions.map(async a => {
              const solicitud = a.payload.doc.data() as SolicitudData; // Datos de la solicitud
              const id = a.payload.doc.id;
  
              // Obtener datos del destino relacionado con la solicitud
              const destinoDoc = await this.firestore.collection('destinos').doc(solicitud.destinoId).ref.get();
              const destinoData = destinoDoc.exists ? (destinoDoc.data() as DestinoData) : null;
  
              if (!destinoData) {
                console.warn('Destino no encontrado para solicitud:', solicitud.destinoId);
                return null; // Ignorar solicitudes sin destino válido
              }
  
              // Calcular capacidad restante y obtener pasajeros actuales
              const capacidadRestante = destinoData.capacidad - (destinoData.pasajeros || 0);
              const pasajeros = destinoData.pasajeros || 0;
  
              // Retornar una combinación de datos de solicitud y destino
              return {
                id, // ID de la solicitud
                ...solicitud, // Datos de la solicitud (nombre del pasajero, etc.)
                ...destinoData, // Datos del destino (capacidad, costoFijo, etc.)
                capacidadRestante, // Capacidad restante calculada
                pasajeros // Número de pasajeros actuales
              };
            })
          )
        ),
        map(viajes => viajes.filter(viaje => viaje !== null)) // Filtrar viajes no válidos
      );
  }
  
  
  
  
  

  
  async cancelarPedidoEnFirebase(viajeId: string): Promise<void> {
    try {
      await this.firestore.collection('solicitudes').doc(viajeId).delete();
      console.log(`Pedido con ID ${viajeId} eliminado correctamente.`);
    } catch (error) {
      console.error(`Error al eliminar el pedido con ID ${viajeId}:`, error);
      throw error;
    }
  }

  async actualizarPasajeros(destinoId: string, incremento: number): Promise<void> {
    const destinoDoc = await this.firestore.collection('destinos').doc(destinoId).ref.get();
    const destinoData = destinoDoc.exists ? (destinoDoc.data() as Destino) : null;
  
    if (!destinoData) {
      throw new Error('Destino no encontrado');
    }
  
    const pasajerosActuales = destinoData.pasajeros || 0; // Usar 0 si pasajeros no está definido
    const nuevosPasajeros = pasajerosActuales + incremento;
  
    if (nuevosPasajeros < 0) {
      throw new Error('El número de pasajeros no puede ser negativo');
    }
  
    await this.firestore.collection('destinos').doc(destinoId).update({
      pasajeros: nuevosPasajeros
    });
  }
  
  
  

  async cancelarPedido(viajeId: string, destinoId: string): Promise<void> {
    try {
      // Eliminar la solicitud
      await this.firestore.collection('solicitudes').doc(viajeId).delete();
  
      // Reducir pasajeros en destino
      await this.actualizarPasajeros(destinoId, -1);
  
      console.log('Pedido cancelado y pasajeros actualizados.');
    } catch (error) {
      console.error('Error al cancelar el pedido:', error);
      throw error;
    }
  }
  


}


















