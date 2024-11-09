import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private firestore: AngularFirestore) { }

  // Método para agregar un documento de prueba
  agregarPrueba(data: any) {
    return this.firestore.collection('pruebas').add(data);
  }
}