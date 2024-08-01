import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser = { email: 'test@example.com', password: 'password123' };

  login(email: string, password: string): Observable<any> {
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return of({ success: true });
    } else {
      return throwError({ success: false, message: 'Invalid credentials' });
    }
  }
}
