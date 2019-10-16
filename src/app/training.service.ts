import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { HttpHeaders } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Training } from './training';  

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

 
  url = 'http://localhost:51040//Api/Training'; 

  constructor(private http: HttpClient) { }  
  getAllTrainings(): Observable<Training[]> {  
    return this.http.get<Training[]>(this.url + '/AllTrainings');  
  }  
   createTraining(training: Training): Observable<Training> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Training>(this.url + '/InsertTrainingInfo/',  
    training, httpOptions);  
  }    
}
