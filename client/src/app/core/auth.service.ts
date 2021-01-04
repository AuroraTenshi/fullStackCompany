import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Role, Worker } from './worker';

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authLink = 'http://localhost:8080/workers';

  public isLoggedIn: boolean = false;
  public worker: Worker;
  public redirectUrl: string

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  public async login(name: string, password: string): Promise<Worker> {
    try {
      const token = btoa(`${name}:${password}`);
      httpOptions.headers = httpOptions.headers.set('Authorization', `Basic ${token}`);
      const worker = await this.httpClient.post<Worker>(`${this.authLink}/authenticate`, {}, httpOptions).toPromise();
      if(!worker.projects){
        worker.projects=[];
      }
      this.isLoggedIn = true;
      this.worker = worker;
      
      this.router.navigate(['/projects']);
      return Promise.resolve(this.worker);
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  public logout(): void {
    httpOptions.headers = httpOptions.headers.set('Authorization', '');
    this.isLoggedIn = false;
    this.worker = null;
  }

  public isEmployer():boolean{
    return this.worker.role===Role.Employer;
  }

}
