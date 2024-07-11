import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ToDoListDto } from '../../models/ToDoList/to-do-list-dto';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/ToDoList`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/ToDoList/${id}`);
  }

  add(toDoListDto: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/ToDoList`, toDoListDto);
  }

  edit(id: number, toDoListDto: ToDoListDto): Observable<any> {
    return this.http.put<any>(`${environment.baseUrl}/ToDoList`, toDoListDto, {
      params: { id: id.toString() }
    });
  }



  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${environment.baseUrl}/ToDoList`, {
      params: { id: id.toString() }
    });
  }

  markDone(id: number): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/ToDoList/MarkDone/${id}`, {});
  }
}
