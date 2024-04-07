import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }

  getEmployees(): Observable<any>{
    return this._http.get('http://localhost:3000/employees');
  }

  addEmployee(data: any): Observable<any>{
    return this._http.post('http://localhost:3000/employees', data);
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }

  updateEmployee(id: number, data: any): Observable<any>{
    return this._http.patch(`http://localhost:3000/employees/${id}`, data);
  }
}
