import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch'
import {Project} from './project';

@Injectable()
export class HttpService {
    baseURL = 'http://localhost:3000/trending/api/v1';
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) {
    }

    getProjects(): Observable<Project[]> {
        return this.http.get(`${this.baseURL}`, this.httpOptions)
            .catch((err) => {
                return Observable.throw(err)
            });
    }
}
