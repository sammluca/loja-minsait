import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  show(message: string): void {
    alert(message);
  }

  success(message: string): void {
    this.show(message);
  }

  error(message: string): void {
    this.show(message);
  }
}
