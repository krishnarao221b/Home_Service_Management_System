import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

// Functional interceptor with JWT logic
export const jwtInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Retrieve the token from localStorage
  const token = localStorage.getItem('token');

  // If a token exists, clone the request and attach the Authorization header
  if (token) {
    console.log('Attaching token:', token);  // For debugging
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else {
    console.log('No token found in localStorage');
  }

  // Pass the request to the next handler
  return next(req);
};
