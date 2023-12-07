import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { first, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpClient = inject(HttpClient);
  baseUrl = 'http://localhost:3000/api/users'

  getAll(): Promise<User[]> {
    return firstValueFrom(this.httpClient.get<User[]>(this.baseUrl))
  }

  create(newUser: User): Promise<User> {
    return firstValueFrom(this.httpClient.post<User>(this.baseUrl, newUser))
  }

  update(updatedUser: User): Promise<User> {
    return firstValueFrom(this.httpClient.put<User>(`${this.baseUrl}/${updatedUser.id}`, updatedUser))
  }

  remove(userId: number): Promise<User> {
    return firstValueFrom(this.httpClient.delete<User>(`${this.baseUrl}/${userId}`))
  }
}