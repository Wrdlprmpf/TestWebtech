import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from './models/list.model';
import { LoginRequestDTO } from './models/LoginRequestDTO.model';
import { LoginResponseDTO } from './models/LoginResponseDTO.model';
import { User } from './models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
      this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User{
     return this.currentUserSubject.value;
   }
/*
  login(username: string, password: string){
     return this.http.post<any>("http://localhost:3000/api/login", {username, password})
        .pipe(map(user =>{
            localStorage.setItem("currentUser", JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
   }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
*/

  private listUrl = 'http://localhost:3000/spending';
  private accountUrl = "http://localhost:3000/account";

  /*
  login(request:LoginRequestDTO):Observable<LoginResponseDTO>{
    return this.http.post<LoginResponseDTO>("http://localhost:3000/api/login",request);
  }
  

  getLogin(username:String): Observable<any> {
    return this.http.get<any>(this.accountUrl+"/"+username)
  }
  */

  login(request:LoginRequestDTO):Observable<any>{
    return this.http.post<any>("http://localhost:3000/account",request);
  }
  
  getList(): Observable<List[]> {
    return this.http.get<List[]>(this.listUrl)
  }

  deleteEntry(position:Number): Observable<List[]> {
    return this.http.delete<List[]>(this.listUrl+'/'+position)
  }
}