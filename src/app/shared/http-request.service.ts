import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient, HttpErrorResponse, HttpHandler, HttpHeaders} from '@angular/common/http';

@Injectable()
export class HttpRequestService {


  constructor(private http: HttpClient, private router: Router) {
  }


  get(url: string) {
    const result = this.http.get(url)
    .pipe(
      map((response)=>{
        if (response == null) {
          return null;
        }
        return response;
      }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }

  post(url: string, request: any) {
    const result = this.http.post(url, request)
    .pipe(
      map((response: Response)=>{
        if (response == null) {
          return null;
        }
        return response;
      }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }

  delete(url: string) {
    const result = this.http.delete(url)
    .pipe(
      map((response: Response)=>{
        if (response == null) {
          return null;
        }
        return response;
      }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }

  put(url: string, request: any) {
    const result = this.http.put(url, request)
    .pipe(
      map((response: Response)=>{
        if (response == null) {
          return null;
        }
        return response;
      }),
      retry(3), // retry a failed request up to 3 times
    );
    return result;
  }
}
