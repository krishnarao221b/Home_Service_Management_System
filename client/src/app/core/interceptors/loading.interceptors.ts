import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusyService } from '../products/busy.service';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private busyService: BusyService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Start the spinner by calling busy() in the BusyService
    this.busyService.busy();

    return next.handle(req).pipe(
      // When the request completes, hide the spinner using finalize()
      finalize(() => {
        this.busyService.idle();
      })
    );
  }
}
