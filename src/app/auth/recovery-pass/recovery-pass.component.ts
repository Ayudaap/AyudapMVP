import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.css']
})
export class RecoveryPassComponent {

  constructor(private auth: AuthService) { }

  recovery(email: string) {
    if (!email) { return; }
    this.auth.recoveryPassword(email).subscribe({
      next: () => {
        Swal.fire({
          title: 'Recuperación de contraseña',
          icon: 'success',
          text: 'Por favor revisa tu correo, es posible que esté en tu bandeja de SPAM'
        });
      },
      error: (error: Error) => {
        Swal.fire({
          title: 'Recuperación de contraseña',
          icon: 'error',
          text: 'Oops no se pudo procesar enviar el enlace'
        });
      }
    });
  }

}
