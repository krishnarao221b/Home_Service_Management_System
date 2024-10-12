import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log('Intercepting request: ', req.url);  // Debugging: Log the URL of the request
    console.log('Token from localStorage: ', token);  // Debugging: Log the token
    console.log('Interceptor Token:', token);
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
          
        }
      });
      console.log('Authorization header set:', req.headers.get('Authorization')); 
    }

    return next.handle(req);
  }
}
