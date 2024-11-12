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

  // Método para registrar un nuevo usuario
  registrarUsuario(email: string, password: string, userData: any): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          return this.guardarUsuario(uid, userData);
        } else {
          throw new Error('No se pudo obtener el UID del usuario');
        }
      });
  }

  // Guardar los datos del usuario en Firestore
  private guardarUsuario(uid: string, userData: any): Promise<void> {
    return this.firestore.collection('usuarios').doc(uid).set(userData);
  }

  // Método de inicio de sesión
  iniciarSesion(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  // Obtener el usuario autenticado actual
  obtenerUsuarioAutenticado(): Observable<any> {
    return this.auth.authState;
  }

  // Agregar un destino seleccionado en Firestore
  agregarDestino(uid: string, destino: any): Promise<any> {
    return this.firestore.collection('destinos').add({ uid, destino });
  }

  // Obtener destinos en tiempo real desde Firestore
  obtenerDestinos(): Observable<any[]> {
    return this.firestore.collection('destinos').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
