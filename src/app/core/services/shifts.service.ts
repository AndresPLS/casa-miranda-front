import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Shift } from '../interfaces/shift.interface';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api/shifts'

  getAll(): Promise<Shift[]> {
    return firstValueFrom(this.httpClient.get<Shift[]>(this.baseUrl))
  }

  create(newShift: Shift): Promise<Shift> {
    return firstValueFrom(this.httpClient.post<Shift>(this.baseUrl, newShift))
  }

  update(updatedShift: Shift): Promise<Shift> {
    return firstValueFrom(this.httpClient.put<Shift>(`${this.baseUrl}/${updatedShift.id}`, updatedShift))
  }

  remove(shiftId: number): Promise<Shift> {
    return firstValueFrom(this.httpClient.delete<Shift>(`${this.baseUrl}/${shiftId}`))
  }

}
