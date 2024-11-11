import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private firestore: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  // Obtener el usuario autenticado actual
  obtenerUsuarioAutenticado(): Promise<any> {
    console.log("Obteniendo usuario autenticado...");
    return this.auth.currentUser;
  }

  // Obtener datos de usuario en Firestore
  obtenerUsuario(uid: string): Observable<any> {
    console.log(`Obteniendo datos del usuario con UID: ${uid}`);
    return this.firestore.collection('usuarios').doc(uid).valueChanges();
  }

  // Registro de usuario con email y contraseña
  registrarUsuario(email: string, password: string, userData: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          console.log("Registrando usuario en Firestore...");
          return this.guardarUsuarioEnFirestore(uid, userData);
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      });
  }

  private guardarUsuarioEnFirestore(uid: string, userData: any): Promise<void> {
    console.log(`Guardando datos del usuario con UID: ${uid}`);
    return this.firestore.collection('usuarios').doc(uid).set(userData);
  }

  // Inicio de sesión con email y contraseña
  iniciarSesion(email: string, password: string): Promise<any> {
    
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Agregar viaje a Firestore
  agregarViaje(viaje: any): Promise<any> {
    console.log("Agregando viaje a Firestore:", viaje);
    return this.firestore.collection('viajes').add(viaje);
  }

  // Obtener viajes en tiempo real desde Firestore
  obtenerViajes(): Observable<any[]> {
    console.log("Obteniendo viajes en tiempo real desde Firestore...");
    return this.firestore.collection('viajes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  eliminarViaje(id: string): Promise<void> {
    console.log(`Eliminando viaje con ID: ${id}`);
    return this.firestore.collection('viajes').doc(id).delete();
  }
}