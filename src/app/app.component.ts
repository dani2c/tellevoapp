import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firebaseService: FirebaseService) {
    this.initializeApp();
  }

  initializeApp() {
    // Escuchar eventos de conexión a internet
    window.addEventListener('online', () => {
      console.log('Conexión a internet restaurada. Iniciando sincronización...');
      this.sincronizarUsuariosLocalStorage();
    });

    // Intentar sincronizar en caso de que ya haya conexión al cargar la app
    if (navigator.onLine) {
      console.log('Conexión a internet detectada. Iniciando sincronización...');
      this.sincronizarUsuariosLocalStorage();
    }
  }

  async sincronizarUsuariosLocalStorage() {
    const usuariosPendientes = JSON.parse(localStorage.getItem('usuariosPendientes') || '[]');

    if (usuariosPendientes.length > 0) {
      console.log(`Sincronizando ${usuariosPendientes.length} usuarios...`);
      for (const usuario of usuariosPendientes) {
        try {
          await this.firebaseService.sincronizarUsuarioConFirebase(usuario);
          console.log(`Usuario ${usuario.email} sincronizado exitosamente.`);
        } catch (error) {
          console.error(`Error al sincronizar el usuario ${usuario.email}:`, error);
        }
      }

      // Limpiar usuarios pendientes una vez sincronizados
      localStorage.removeItem('usuariosPendientes');
      console.log('Sincronización completa. Local storage limpiado.');
    } else {
      console.log('No hay usuarios pendientes para sincronizar.');
    }
  }
}

